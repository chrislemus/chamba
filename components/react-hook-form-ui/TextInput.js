import { useFormContext } from 'react-hook-form';
export default function TextInput({
  label,
  type,
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
      return <p class="help is-danger">{errMsg || errTypeMsg}</p>;
    }
  };
  ('');
  const defaultId = `${name}Id`;
  const errorStyle = getError() ? 'is-danger' : '';
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        <input
          {...register(name, validation)}
          className={`input ${errorStyle}`}
          type={type || 'text'}
          id={id || defaultId}
          {...props}
        />
      </div>
      {errorMessage()}
    </div>
  );
}
// <div className="input-wrapper">
//   <input
//     -----{...register(name, validation)}---
//     -----className="input"---
//     -----id={id || defaultId}---
//     -----placeholder=" "
//     invalid={`${!!getError()}`}
//     -----type={type || 'text'}
//     ------{...props}
//   />
//   <label htmlFor={id || defaultId}>{label}</label>
//   {------errorMessage()}
// </div>;
