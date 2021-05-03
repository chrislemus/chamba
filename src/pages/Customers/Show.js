import { Link } from 'react-router-dom';

export default function Customers() {
  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>Customer Name</h1>
        </div>
        <div className="app-header-right">
          <Link to="/customers/new" className="button is-primary is-rounded">
            Edit
          </Link>
        </div>
      </div>
    </>
  );
}
