import CloseIcon from '@material-ui/icons/Close';
import AlertUI from '@material-ui/lab/Alert';
import { IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { clearAlerts } from '../actions/alertActions';

function Alert({ alert, clearAlerts }) {
  console.log(alert, clearAlerts);
  const message = alert?.message;
  if (message) {
    return (
      <AlertUI
        severity={alert.type}
        action={
          <IconButton
            // alertIsOpen=
            aria-label="close"
            color="inherit"
            size="small"
            onClick={clearAlerts}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </AlertUI>
    );
  } else {
    return null;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    clearAlerts: () => dispatch(clearAlerts()),
  };
};
const mapStateToProps = (state) => {
  return { alert: state.alert };
};
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
