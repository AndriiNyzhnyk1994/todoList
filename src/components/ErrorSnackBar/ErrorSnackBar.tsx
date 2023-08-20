import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector } from '../../app/store';
import { RequestStatusType, setErrorAC } from '../../app/app-reducer';
import { useDispatch } from 'react-redux';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomizedSnackbars = () => {
    const [open, setOpen] = React.useState(true);
    const errorStatus = useAppSelector<null | string>((state) => state.app.error)
    const dispatch = useDispatch()
    
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };

    return (
        <Snackbar open={!!errorStatus} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={'error' } sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar>

    );
}