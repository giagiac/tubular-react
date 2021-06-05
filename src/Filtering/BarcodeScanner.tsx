import { useState, useEffect } from 'react';
import * as React from 'react';

import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { Box, Button, Grid, MenuItem, Select } from '@material-ui/core';

const DEVICE_ID = 'DEVICE_ID';

export default function BarcodeScanner({ onChange }: any) {
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [videoInputDevices, setVideoInputDevices] = useState([]);

    const codeReader = new BrowserMultiFormatReader();

    console.log('ZXing code reader initialized');

    useEffect(() => {
        codeReader
            .listVideoInputDevices()
            .then((videoInputDevices) => {
                console.log(videoInputDevices);
                setupDevices(videoInputDevices);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    //const sourceSelect = document.getElementById('sourceSelect') as unknown;

    function setupDevices(videoInputDevices: any) {
        // selects first device
        if (localStorage.getItem(DEVICE_ID) === null) {
            localStorage.setItem(DEVICE_ID, '' + videoInputDevices[0].deviceId);
            setSelectedDeviceId(videoInputDevices[0].deviceId);
        } else {
            setSelectedDeviceId(localStorage.getItem(DEVICE_ID));
        }

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
        localStorage.setItem(DEVICE_ID, '' + event.target.value);
    };

    return (
        <>
            <Grid container justify="center">
                <Box p={1}>
                    <Button variant="outlined" id="resetButton" onClick={() => resetClick()}>
                        Reset
                    </Button>
                </Box>
                <Box p={1}>
                    <Select variant="outlined" value={selectedDeviceId} onChange={handleChange}>
                        {videoInputDevices.map((element: any, index) => (
                            <MenuItem key={index} value={element.deviceId}>
                                {element.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Grid>
            <video id="video" width="100%" height="100%" />
        </>
    );
}
