import { useState, useEffect } from 'react';
import * as React from 'react';

import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Box, Button, Grid, Select } from '@material-ui/core';

export default function BarcodeScanner({ onChange }: any) {
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [videoInputDevices, setVideoInputDevices] = useState([]);

    const codeReader = new BrowserMultiFormatReader();

    console.log('ZXing code reader initialized');

    useEffect(() => {
        codeReader
            .listVideoInputDevices()
            .then((videoInputDevices) => {
                setupDevices(videoInputDevices);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    //const sourceSelect = document.getElementById('sourceSelect') as unknown;

    function setupDevices(videoInputDevices: any) {
        // selects first device
        setSelectedDeviceId(videoInputDevices[0].deviceId);

        // setup devices dropdown
        if (videoInputDevices.length >= 1) {
            setVideoInputDevices(videoInputDevices);
        }
    }

    function resetClick() {
        codeReader.reset();
    }

    function decodeContinuously(selectedDeviceId: string) {
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result: any, err) => {
            if (result) {
                console.log(result);
                codeReader.stopContinuousDecode();
                onChange(result.text);
            }
            if (err && !(err instanceof NotFoundException)) {
                console.error(err);
            }
        });
    }

    useEffect(() => {
        decodeContinuously(selectedDeviceId);
        console.log(`Started decode from camera with id ${selectedDeviceId}`);
        return () => {
            codeReader.stopContinuousDecode();
            console.log('byebye');
        };
    }, [selectedDeviceId]);

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setSelectedDeviceId(event.target.value);
    };

    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                {/* <div id="sourceSelectPanel">
                    <label htmlFor="sourceSelect">Change video source:</label>
                    <select id="sourceSelect" onChange={() => setSelectedDeviceId(sourceSelect)}>
                        {videoInputDevices.map((element, index) => (
                            <option key={index} value={element.deviceId}>
                                {element.label}
                            </option>
                        ))}
                    </select>
                </div> */}
                <Grid container justify="center">
                    <Box p={2}>
                        <Select variant="outlined" value={selectedDeviceId} onChange={handleChange}>
                            {videoInputDevices.map((element, index) => (
                                <option key={index} value={element.deviceId}>
                                    {element.label}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Grid>

                <video id="video" width="300" height="200" />

                <Grid container justify="center">
                    <Box p={2}>
                        <Button id="resetButton" onClick={() => resetClick()}>
                            Reset
                        </Button>
                    </Box>
                </Grid>
            </section>
        </main>
    );
}
