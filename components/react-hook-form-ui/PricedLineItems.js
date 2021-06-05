import { useFieldArray } from 'react-hook-form';
import { TextInput, TextArea } from './';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useLayoutEffect } from 'react';

const blankLineItemValues = { name: '', description: '', price: 0 };

export default function PricedLineItems({
  reactHookFormMethods,
  fieldArrayName,
}) {
  const { fields, remove, append } = useFieldArray({ name: fieldArrayName });
  const addLineItem = () => append(blankLineItemValues);
  //default: if no line items provided add a blank line item on mount
  const zeroLineItems = fields.length === 0;
  useLayoutEffect(() => {
    zeroLineItems && addLineItem();
  }, []);
  if (zeroLineItems) return null;
  //---------
  const { setValue, watch } = reactHookFormMethods;
  const lineItemsData = watch(fieldArrayName);
  const lineItemsTotal = lineItemsData
    .reduce((a, { price }) => parseFloat(a) + (parseFloat(price) || 0), 0)
    .toFixed(2);
  return (
    <>
      <table className="table mt-5 is-fullwidth ">
        <thead>
          <tr>
            <th>Product/Service</th>
            <th className=" has-text-right is-narrow">Unit Price</th>
            <th className=" is-narrow"></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => {
            const fieldName = `${fieldArrayName}.${index}`;
            const lineItem = lineItemsData[index];

            return lineItem._destroy ? null : (
              <tr key={field.id}>
                <td>
                  <TextInput
                    name={`${fieldName}.name`}
                    defaultValue={field.name}
                    validation={{ required: 'required' }}
                    placeholder="Name"
                  />
                  <TextArea
                    name={`${fieldName}.description`}
                    defaultValue={field.description}
                    placeholder="Description"
                    rows="3"
                  />
                </td>
                <td>
                  <TextInput
                    name={`${fieldName}.price`}
                    defaultValue={field.price}
                    onBlur={() => {
                      let price = parseFloat(lineItem.price) || 0;
                      setValue(`${fieldName}.price`, price.toFixed(2));
                    }}
                  />
                </td>
                <td>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        lineItem?.id
                          ? setValue(`${fieldName}._destroy`, true)
                          : remove(index)
                      }
                      className="button is-ghost has-text-danger"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            <td className=" has-text-left has-text-weight-bold ">
              {' '}
              <button
                type="button"
                onClick={addLineItem}
                className="button is-info is-inverted ml-3"
              >
                <strong>Add item</strong>
              </button>
            </td>
            <td className=" has-text-right ">
              <strong>Total</strong> ${lineItemsTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
//validations
// //line items validation
// let validLineItems = true;
// const invoiceLineItemsAttributes =
//   values.invoiceLineItemsAttributes.map((lineItem) => {
//     let lineItemErrors = {};
//     if (lineItem.name.length === 0) {
//       validLineItems = false;
//       lineItemErrors.name = 'Item name is required';
//     }
//     return lineItemErrors;
//   });
