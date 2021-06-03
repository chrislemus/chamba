export default function ValidationErrors(props) {
  const errors = props?.errors
  if (errors && errors?.length > 0) {
    return (
      <div className="content">
        <ul className="has-text-danger mb-5">
          {errors.map((error, idx) => (
            <li key={`auth-error-${idx}`}>{error}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}
