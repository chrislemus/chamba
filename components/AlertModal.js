import { useDispatch, useSelector } from 'react-redux';
import { alertModalClear } from '../actions/alertModalActions';
import { useState, useEffect } from 'react';

export default function AlertModal() {
  const [alertModalTimeOut, setAlertModalTimeOut] = useState(null);
  const dispatch = useDispatch();
  const alertModal = useSelector((state) => state.alertModal);
  const type = alertModal?.type || 'info';
  const icons = {
    info: 'fa-info-circle',
    success: 'fa-check-square',
    warning: 'fa-exclamation-triangle',
    danger: 'fa-ban',
  };
  const message = alertModal?.message;

  useEffect(() => {
    clearCurrentAlertModalTimeOut();

    if (message?.length) {
      const alertModalTimeOut = setTimeout(() => {
        dispatch(alertModalClear());
      }, 5000);
      setAlertModalTimeOut(alertModalTimeOut);
    }
  }, [message]);

  const clearCurrentAlertModalTimeOut = () => {
    if (alertModalTimeOut) {
      clearTimeout(alertModalTimeOut);
      setAlertModalTimeOut(null);
    }
  };

  if (message) {
    return (
      <div className={`alert-modal is-${type} is-light`}>
        <button
          className="delete"
          onClick={() => dispatch(alertModalClear())}
        ></button>
        <span className={`icon is-large has-text-${type}`}>
          <i className={`fas ${icons[type]}`}></i>
        </span>

        {message}
      </div>
    );
  } else {
    return null;
  }
}
