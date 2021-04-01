import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import CameraAltTwoTone from '@material-ui/icons/CameraAltTwoTone';

import BarcodeScanner from './BarcodeScanner';

import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

const styles = {
    formControl: {
        marginTop: '0px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '0px',
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

    const adorment = (
        <InputAdornment position="end">
            <Search />
        </InputAdornment>
    );

    const endAd = searchText !== '' && (
        <InputAdornment position="end">
            <IconButton onClick={onClear}>
                <Close />
            </IconButton>
        </InputAdornment>
    );

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FormControl>
                <div>
                    <TextField
                        style={styles.formControl}
                        size="small"
                        variant="outlined"
                        type="text"
                        value={searchText}
                        onChange={onChange}
                        InputProps={{ startAdornment: adorment, endAdornment: endAd }}
                    />
                    <Button style={styles.formControl} variant="outlined" color="primary" onClick={handleClickOpen}>
                        <CameraAltTwoTone />
                    </Button>
                </div>
            </FormControl>
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
                    <Button variant="contained" autoFocus onClick={handleClose} color="primary">
                        Chiudi
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
