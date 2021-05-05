export default function SubmitButton({ status, children }) {
  const isFetching = status === 'fetching';
  const loadingClass = isFetching ? 'is-loading' : '';
  return (
    <button
      className={`button is-primary is-rounded ${loadingClass}`}
      disabled={isFetching}
      type="submit"
    >
      {children}
    </button>
  );
}
