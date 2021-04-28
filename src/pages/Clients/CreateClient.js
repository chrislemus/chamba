export default function CreateClient(params) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title is-4">New Client</h1>

      <div className="box p-5">
        <div className="content">
          <ul className="has-text-danger mb-5">
            {/* {authUser.errors.map((error, idx) => (
                    <li key={`auth-error-${idx}`}>{error}</li>
                  ))} */}
          </ul>
        </div>
        <div className="field-body mb-3">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="John" />
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input class="input" type="text" placeholder="Doe" />
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" />
          </div>
        </div>

        <div className="field-body mb-3">
          <div class="field">
            <label class="label">Phone Mobile</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Phone Home</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Address 1</label>
          <div class="control">
            <input class="input" type="text" />
          </div>
        </div>
        <div class="field">
          <label class="label">Address 2</label>
          <div class="control">
            <input class="input" type="text" />
          </div>
        </div>
        <div className="columns mb-3">
          <div class="field column is-narrow">
            <label class="label">State/Region</label>
            <div class="control ">
              <div class="select">
                <select>
                  {USStates.map(([state, abbr]) => (
                    <option key={`us-state-${abbr}`} value={abbr}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div class="field column is-narrow">
            <label class="label">Zip Code</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>
          <div class="field column is-narrow">
            <label class="label">Country</label>
            <div class="control">
              <input
                class="input"
                type="text"
                value="USA"
                placeholder="USA"
                disabled
              />
            </div>
          </div>
        </div>

        <button
          className={`button is-primary`}
          // disabled={authUser.fetching}
          type="submit"
        >
          Create Client
        </button>
      </div>
    </form>
  );
}

const USStates = [
  ['Alabama', 'AL'],
  ['Alaska', 'AK'],
  ['Arizona', 'AZ'],
  ['Arkansas', 'AR'],
  ['California', 'CA'],
  ['Colorado', 'CO'],
  ['Connecticut', 'CT'],
  ['Delaware', 'DE'],
  ['Florida', 'FL'],
  ['Georgia', 'GA'],
  ['Hawaii', 'HI'],
  ['Idaho', 'ID'],
  ['Illinois', 'IL'],
  ['Indiana', 'IN'],
  ['Iowa', 'IA'],
  ['Kansas', 'KS'],
  ['Kentucky', 'KY'],
  ['Louisiana', 'LA'],
  ['Maine', 'ME'],
  ['Maryland', 'MD'],
  ['Massachusetts', 'MA'],
  ['Michigan', 'MI'],
  ['Minnesota', 'MN'],
  ['Mississippi', 'MS'],
  ['Missouri', 'MO'],
  ['Montana', 'MT'],
  ['Nebraska', 'NE'],
  ['Nevada', 'NV'],
  ['New Hampshire', 'NH'],
  ['New Jersey', 'NJ'],
  ['New Mexico', 'NM'],
  ['New York', 'NY'],
  ['North Carolina', 'NC'],
  ['North Dakota', 'ND'],
  ['Ohio', 'OH'],
  ['Oklahoma', 'OK'],
  ['Oregon', 'OR'],
  ['Pennsylvania', 'PA'],
  ['Rhode Island', 'RI'],
  ['South Carolina', 'SC'],
  ['South Dakota', 'SD'],
  ['Tennessee', 'TN'],
  ['Texas', 'TX'],
  ['Utah', 'UT'],
  ['Vermont', 'VT'],
  ['Virginia', 'VA'],
  ['Washington', 'WA'],
  ['West Virginia', 'WV'],
  ['Wisconsin', 'WI'],
  ['Wyoming', 'WY'],
];
