export default function alertReducer(state = {}, action) {
  switch (action.type) {
    case 'ALERT_SUCCESS':
      return {
        type: 'success',
        message: action.payload.message,
      };
    case 'ALERT_INFO':
      return {
        type: 'info',
        message: action.payload.message,
      };
    case 'ALERT_WARNING':
      return {
        type: 'warning',
        message: action.payload.message,
      };
    case 'ALERT_DANGER':
      return {
        type: 'error',
        message: action.payload.message,
      };
    case 'ALERT_CLEAR':
      return {
        type: null,
        message: '',
      };
    default:
      return state;
  }
}
