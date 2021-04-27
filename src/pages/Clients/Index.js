import { Link } from 'react-router-dom';

export default function Clients(params) {
  return (
    <div>
      <h1 className="title is-4">Clients</h1>

      <div className="card is-fullwidth">
        <header className="card-header is-shadowless	pt-4 px-5">
          <div className="field">
            <p className="control has-icons-left has-icons-right is-loading">
              <input
                className="input"
                type="text"
                placeholder="Search clients"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </p>
          </div>
        </header>
        <div className="card-content  ">
          <div className="table-container is-fullwidth">
            <table className="table is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>
                    <span className="icon has-text-grey">
                      <i className="far fa-square"></i>
                    </span>
                  </th>
                  <th>Name</th>
                  <th className="is-hidden-mobile">Email</th>
                  <th className="is-hidden-mobile">Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <span className="icon has-text-grey">
                      <i className="far fa-square"></i>
                    </span>
                  </td>
                  <td>
                    <div className="columns level">
                      <div className="column is-narrow">
                        <p className="image is-32x32">
                          <img
                            className="is-rounded"
                            src="https://bulma.io/images/placeholders/128x128.png"
                          />
                        </p>
                      </div>
                      <div className="column">
                        <Link href="/clients/1">Mike Tyson</Link>
                      </div>
                    </div>
                  </td>
                  <td className="is-hidden-mobile">
                    <Link href="mailto:mike@me.com">mike@me.com</Link>
                  </td>
                  <td className="is-hidden-mobile">(919)995-9906</td>
                  <td>
                    <Link to="/clients/1/edit" className="button is-ghost  ">
                      <span className="icon ">
                        <i className="fas fa-edit"></i>
                      </span>
                    </Link>
                    <Link to="/clients/1" className="button is-ghost ">
                      <span className="icon">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="icon has-text-grey">
                      <i className="far fa-square"></i>
                    </span>
                  </td>
                  <td>
                    <Link href="/clients/1">Rob Dyrdek</Link>
                  </td>

                  <td className="is-hidden-mobile">
                    <Link href="mailto:robdyrdek@me.com">mike@me.com</Link>
                  </td>
                  <td className="is-hidden-mobile">(919)995-9906</td>
                  <td>
                    <Link to="/clients/1/edit" className="button is-ghost  ">
                      <span className="icon ">
                        <i className="fas fa-edit"></i>
                      </span>
                    </Link>
                    <Link to="/clients/1" className="button is-ghost ">
                      <span className="icon">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
