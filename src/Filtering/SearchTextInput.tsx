import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import CameraAltTwoTone from '@material-ui/icons/CameraAltTwoTone';

import BarcodeScanner from './BarcodeScanner';

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

const styles = {
    formControl: {
        // marginTop: '0px',
        // marginLeft: '10px',
        // marginRight: '10px',
        // marginBottom: '0px',
        // width: 250,
    },
    buttonCamera: {
        // marginTop: '0px',
        // marginLeft: '10px',
        // marginRight: '10px',
        // marginBottom: '0px',
    },
};

export interface SearchTextInputProps {
    searchText: string;
    updateSearchText: (value: string) => void;
}

export const SearchTextInput: React.FunctionComponent<SearchTextInputProps> = ({
    searchText,
    updateSearchText,
}: SearchTextInputProps) => {
    const onChange = (e: any) => updateSearchText(e.target.value);
    const onClear = () => updateSearchText('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const adorment = (
        <InputAdornment position="end">
            <Search />
        </InputAdornment>
    );

    const endAd = (
        <InputAdornment position="start">
            {searchText !== '' && (
                <IconButton onClick={onClear}>
                    <Close />
                </IconButton>
            )}
            <Button style={styles.buttonCamera} variant="outlined" color="secondary" onClick={handleClickOpen}>
                <CameraAltTwoTone />
            </Button>
        </InputAdornment>
    );

    return (
        <Container maxWidth="sm">
            <FormControl fullWidth>
                <TextField
                    style={styles.formControl}
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={searchText}
                    onChange={onChange}
                    InputProps={{ startAdornment: adorment, endAdornment: endAd }}
                />
                <Dialog keepMounted={false} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers>
                        <BarcodeScanner
                            onChange={(value: string) => {
                                updateSearchText(value);
                                handleClose();
                            }}
                        ></BarcodeScanner>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose} color="primary">
                            Chiudi
                        </Button>
                    </DialogActions>
                </Dialog>
            </FormControl>
        </Container>
    );
};
