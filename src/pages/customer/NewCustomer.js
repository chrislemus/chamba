import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { newCustomer } from '../../actions/customersActions';
import { Link } from 'react-router-dom';

// import Form from './Form';

export default function NewCustomer(params) {
  const dispatch = useDispatch();
  const firstName = useRef('');
  const lastName = useRef('');
  const email = useRef('');
  const phoneMobile = useRef('');
  const phoneHome = useRef('');
  const address1 = useRef('');
  const address2 = useRef('');
  const state = useRef('');
  const zipCode = useRef('');
  const country = useRef('');
  const [fetching, setFetching] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const refInputValue = (ref) => {
    return ref?.current?.value;
  };
  const getFormData = () => ({
    firstName: refInputValue(firstName),
    lastName: refInputValue(lastName),
    email: refInputValue(email),
    phoneMobile: refInputValue(phoneMobile),
    phoneHome: refInputValue(phoneHome),
    address1: refInputValue(address1),
    address2: refInputValue(address2),
    state: refInputValue(state),
    zipCode: refInputValue(zipCode),
    country: refInputValue(country),
  });
  // console.log(apiAuthHeader());
  const handleSubmit = (event) => {
    event.preventDefault();
    const customer = getFormData();
    dispatch(newCustomer(customer));
  };

  return (
    <>
      <div className="app-header">
        <div className="app-header-left">
          <h1>New Customer</h1>
        </div>
        <div className="app-header-right">
          <Link
            to="/customers"
            className="button is-primary is-outlined is-rounded"
          >
            Cancel
          </Link>
        </div>
      </div>
      <form className="box p-5" onSubmit={handleSubmit}>
        <div className="content">
          <ul className="has-text-danger mb-5">
            {formErrors.map((error, idx) => (
              <li key={`auth-error-${idx}`}>{error}</li>
            ))}
          </ul>
        </div>
        <div className="field-body mb-3">
          <div class="field">
            <label class="label">First Name</label>
            <div class="control">
              <input
                ref={firstName}
                class="input"
                type="text"
                placeholder="John"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Last Name</label>
            <div class="control">
              <input
                ref={lastName}
                class="input"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input ref={email} class="input" type="text" />
          </div>
        </div>

        <div className="field-body mb-3">
          <div class="field">
            <label class="label">Phone Mobile</label>
            <div class="control">
              <input ref={phoneMobile} class="input" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Phone Home</label>
            <div class="control">
              <input ref={phoneHome} class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Address 1</label>
          <div class="control">
            <input ref={address1} class="input" type="text" />
          </div>
        </div>
        <div class="field">
          <label class="label">Address 2</label>
          <div class="control">
            <input ref={address2} class="input" type="text" />
          </div>
        </div>
        <div className="columns mb-3">
          <div class="field column is-narrow">
            <label class="label">State/Region</label>
            <div class="control ">
              <div class="select">
                <select ref={state}>
                  <option value="none">Select dropdown</option>
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
              <input ref={zipCode} class="input" type="text" />
            </div>
          </div>
          <div class="field column is-narrow">
            <label class="label">Country</label>
            <div class="control">
              <input
                ref={country}
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
          className={`button is-primary ${fetching && 'is-loading'}`}
          disabled={fetching}
          type="submit"
        >
          Create ustomer
        </button>
      </form>
    </>
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
