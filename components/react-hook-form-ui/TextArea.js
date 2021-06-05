import { useFormContext } from 'react-hook-form';
export default function TextArea({
  label,
  name,
  id,
  validation,
  validationTypeMessage,
  ...props
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  //helps retrieves errors for nested fields
  const getError = () =>
    name.split('.').reduce((err, n) => (err && err[n]) || null, errors);

  const errorMessage = () => {
    const error = getError();
    const errMsg = error?.message;
    //react hook forms does not allow for 'validation error message' to all validations.
    // object can be passed to validationTypeMessage attribute. If any property name matches the validation type, custom error message will display
    const errTypeMsg = validationTypeMessage?.[error?.type];
    if (errMsg || errTypeMsg) {
      return <span className="input-error">{errMsg || errTypeMsg}</span>;
    }
  };
  ('');
  const defaultId = `${name}Id`;
  return (
    <div className="input-wrapper">
      <textarea
        {...register(name, validation)}
        className="textarea"
        id={id || defaultId}
        placeholder=" "
        invalid={`${!!getError()}`}
        {...props}
      />
      <label htmlFor={id || defaultId}>{label}</label>
      {errorMessage()}
    </div>
  );
}
