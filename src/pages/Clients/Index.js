export default function Clients(params) {
  return (
    <div>
      <h1 className="title is-4">Clients</h1>
      <div className="card">
        <header class="card-header is-shadowless	">
          <p class="card-header-title">Card header</p>
          <button class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              {/* <thead> */}
              <tr>
                <th>
                  <span class="icon-text has-text-grey	">
                    <span class="icon">
                      <i class="far fa-square"></i>
                    </span>
                  </span>
                </th>
                <th className="has-text-grey">Name</th>
                <th className="has-text-grey">Qualification or relegation</th>
              </tr>
              {/* </thead> */}

              <tbody>
                <tr>
                  <th>1</th>
                  <td>
                    <a
                      href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
                      title="Leicester City F.C."
                    >
                      Leicester City
                    </a>{' '}
                    <strong>(C)</strong>
                  </td>
                  <td>
                    Qualification for the{' '}
                    <a
                      href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
                      title="2016–17 UEFA Champions League"
                    >
                      Champions League group stage
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>
                    <a
                      href="https://en.wikipedia.org/wiki/Arsenal_F.C."
                      title="Arsenal F.C."
                    >
                      Arsenal
                    </a>
                  </td>

                  <td>
                    Qualification for the{' '}
                    <a
                      href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
                      title="2016–17 UEFA Champions League"
                    >
                      Champions League group stage
                    </a>
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
