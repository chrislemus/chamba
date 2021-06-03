import Spinner from '../ui/Spinner';

// wraps components that display external data. If data is present, children components will display. Else
// a help message will display to user.
export default function DataFetchWrapper({
  status,
  dataName = '',
  hasData,
  children,
}) {
  const zeroResults = status === 'success' && !hasData;
  if (status === 'error' || zeroResults) {
    return (
      <div className="columns is-centered p-5">
        <div className="column is-size-4	has-text-grey		is-narrow ">
          {zeroResults ? (
            <p>No {dataName}</p>
          ) : (
            <div className="icon-text">
              <span className="icon ">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
              <span>Failed to fetch {dataName}</span>
            </div>
          )}
        </div>
      </div>
    );
  } else if (status === 'loading') {
    return (
      <div className="p-5 ">
        <Spinner />
      </div>
    );
  }

  return <div>{children}</div>;
}
