import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import TextField from './TextField';

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  makeStyles,
  Button,
} from '@material-ui/core';

const blankLineItemValues = { name: '', description: '', price: 0 };
const useStyles = makeStyles((theme) => ({
  priceCell: {
    verticalAlign: 'top',
    width: '1%',
  },
  deleteButtonCell: {
    width: '1%',
  },
  deleteButton: {
    color: theme.palette.error.light,
  },
  priceInput: {
    width: 100,
  },
  boldText: {
    fontWeight: theme.typography.fontWeightBold,
  },
  removeBottomBorder: {
    '& td': {
      border: 'none',
    },
  },
}));

export default function PricedLineItems({ fieldArrayName }) {
  const classes = useStyles();
  const { setValue, watch, register } = useFormContext();
  const { fields, remove, append } = useFieldArray({ name: fieldArrayName });
  const addLineItem = () => append(blankLineItemValues);
  //default: if no line items provided add a blank line item on mount
  const zeroLineItems = fields.length === 0;
  useEffect(() => {
    zeroLineItems && addLineItem();
  }, []);
  if (zeroLineItems) return null;
  //---------
  const lineItemsData = watch(fieldArrayName);
  const lineItemsTotal = lineItemsData
    ? lineItemsData
        .reduce((a, { price }) => parseFloat(a) + (parseFloat(price) || 0), 0)
        .toFixed(2)
    : 0;
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Product/Service</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Price</strong>
            </TableCell>
            {fields.length > 1 && <TableCell size="small" align="right" />}
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field, index) => {
            const fieldName = `${fieldArrayName}.${index}`;
            const lineItem = lineItemsData?.[index];

            return lineItem?._destroy ? null : (
              <TableRow key={field.id}>
                <TableCell>
                  <TextField
                    name={`${fieldName}.name`}
                    rules={{ required: true }}
                    variant="outlined"
                    fullWidth
                    defaultValue={field.name}
                    placeholder="Name"
                    size="small"
                  />
                  <TextField
                    name={`${fieldName}.description`}
                    defaultValue={field.description}
                    placeholder="Description"
                    multiline
                    rows="3"
                    fullWidth
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right" className={classes.priceCell}>
                  <TextField
                    name={`${fieldName}.price`}
                    defaultValue={field.price}
                    variant="outlined"
                    size="small"
                    className={classes.priceInput}
                    setValueAs={{
                      onBlur: (value) => {
                        let price = parseFloat(value) || 0;
                        return price.toFixed(2);
                      },
                    }}
                  />
                </TableCell>
                {fields.length > 1 && (
                  <TableCell
                    size="small"
                    align="right"
                    className={classes.deleteButtonCell}
                  >
                    <IconButton
                      className={classes.deleteButton}
                      aria-label="delete line item"
                      size="small"
                      onClick={() =>
                        lineItem?.id
                          ? setValue(`${fieldName}._destroy`, true)
                          : remove(index)
                      }
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
          <TableRow className={classes.removeBottomBorder}>
            <TableCell>
              <Button
                color="primary"
                className={classes.boldText}
                onClick={addLineItem}
              >
                Add item
              </Button>
            </TableCell>
            <TableCell align="right">
              <strong>Total</strong> ${lineItemsTotal}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
