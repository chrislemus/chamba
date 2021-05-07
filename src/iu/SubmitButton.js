export default function SubmitButton(props) {
  const { status, isValid, dirty, children } = props
  const loadingClass = status === 'loading' ? 'is-loading' : '';
  const isInvalid =  props.hasOwnProperty('isValid') && !isValid
  //if form, 'save button' will be disabled until changes have been made
  const isDirty = props.hasOwnProperty('dirty') && props.dirty === false
  const shouldDisable = status === 'loading' || isDirty || isInvalid
  return (
    <button
      className={`button is-primary is-rounded ${loadingClass}`}
      disabled={shouldDisable}
      type="submit"
    >
      {children}
    </button>
  );
}
