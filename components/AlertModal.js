import { useDispatch, useSelector } from 'react-redux';
import { alertModalClear } from '../actions/alertModalActions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function AlertModal() {
  const dispatch = useDispatch();
  const alertModal = useSelector((state) => state.alertModal);
  const type = alertModal?.type || 'info';
  const message = alertModal?.message;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    dispatch(alertModalClear());
  };

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="standard" {...props} />;
}
