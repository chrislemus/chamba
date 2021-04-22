export const alertSuccess = (message) => {
  return { type: 'ALERT_SUCCESS', payload: { message } };
};
export const alertInfo = (message) => {
  return { type: 'ALERT_INFO', payload: { message } };
};
export const alertWarning = (message) => {
  return { type: 'ALERT_WARNING', payload: { message } };
};
export const alertDanger = (message) => {
  return { type: 'ALERT_DANGER', payload: { message } };
};
export const clearAlerts = () => {
  return { type: 'ALERT_CLEAR' };
};
