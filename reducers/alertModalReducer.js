export default function alertModalReducer(state = {}, action) {
  switch (action.type) {
    case 'ALERT_MODAL_SUCCESS':
      return {
        type: 'success',
        message: action.payload,
      };
    case 'ALERT_MODAL_INFO':
      return {
        type: 'info',
        message: action.payload,
      };
    case 'ALERT_MODAL_WARNING':
      return {
        type: 'warning',
        message: action.payload,
      };
    case 'ALERT_MODAL_DANGER':
      return {
        type: 'danger',
        message: action.payload,
      };
    case 'ALERT_MODAL_CLEAR':
      return {
        type: null,
        message: null,
      };
    default:
      return state;
  }
}
