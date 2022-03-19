import { createContext, useState } from "react";
import {
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';

export const State = createContext({});

const Context = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState('success');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const [handleDialogAgree, setHandleDialogAgree] = useState(() => { })

    const showSnackbar = (message, severity) => {
        setAlertMessage(message);
        setSnackbarOpen(true);
        setSeverity(severity);
    }

    const showDialog = (title, content, agreeFunction) => {
        setDialogOpen(true);
        setDialogContent(content);
        setDialogTitle(title);
        setHandleDialogAgree(agreeFunction);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogTitle('');
        setDialogContent('');
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    return (
        <>
            <State.Provider
                value={{
                    showSnackbar,
                    showDialog
                }}
            >
                {children}
            </State.Provider>
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                autoHideDuration={5000}
            >
                <Alert
                    sx={{
                        width: '100%',
                    }}
                    onClose={handleSnackbarClose}
                    severity={severity}>{alertMessage}</Alert>
            </Snackbar>
            <Dialog
                open={dialogOpen}
                keepMounted
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    color: 'black'
                }}
            >
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Disagree</Button>
                    <Button onClick={() => {
                        handleDialogAgree();
                        handleDialogClose();
                    }}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Context