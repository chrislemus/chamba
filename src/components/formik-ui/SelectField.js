import { useField } from 'formik';

export default function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  const fieldName = props?.name;
  const options = props?.options;
  const selectOptions =
    options &&
    options.map((option) => (
      <option key={`form-${fieldName}-${option.name}`} value={option.value}>
        {option.name}
      </option>
    ));
  const filteredProps = { ...props, options: undefined };
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="select">
        <select {...field} {...filteredProps}>
          <option value="">Please select</option>
          {selectOptions}
        </select>
      </div>

      {meta.touched && meta.error ? (
        <p className="help is-danger">{meta.error}</p>
      ) : null}
    </div>
  );
}
