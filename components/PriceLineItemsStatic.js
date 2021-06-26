import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function PriceLineItemsStatic({ lineItems }) {
  if (!lineItems) return null;
  const total = lineItems
    .reduce(
      (total, { price }) => parseFloat(total) + (parseFloat(price) || 0),
      0
    )
    .toFixed(2);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Product/Service</TableCell>

            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems &&
            lineItems.map(({ id, name, description, price }) => (
              <TableRow key={`InvoiceLineItem-${id}`}>
                <TableCell colSpan={3}>
                  <strong>{name}</strong>
                  <br />
                  {description}
                </TableCell>
                <TableCell>${price}</TableCell>
              </TableRow>
            ))}

          <TableRow>
            <TableCell colSpan={3}>
              <Typography align="right">
                <strong>Total</strong>
              </Typography>
            </TableCell>

            <TableCell>${total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
