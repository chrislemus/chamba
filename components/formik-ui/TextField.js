import { useField } from 'formik';

export default function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <input className="input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <p className="help is-danger">{meta.error}</p>
      ) : null}
    </div>
  );
}
