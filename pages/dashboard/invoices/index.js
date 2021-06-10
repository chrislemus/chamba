import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import DataFetchWrapper from '../../../components/DataFetchWrapper';
import { fetchInvoices } from '../../../services/api';
import { parseISO, format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import {
  Table,
  IconButton,
  TablePagination,
  Box,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  Button,
} from '@material-ui/core';

export default function Invoices() {
  const [query, setQuery] = useState('');
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { status, data } = useQuery(
    ['invoices', { query, pageLimit, page }],
    () => fetchInvoices(query, pageLimit, page)
  );
  const statusStyle = {
    pending: 'info',
    paid: 'success',
    canceled: 'warning',
    overdue: 'error',
  };

  const invoices = data?.invoices;
  const queryData = data?.queryData;

  return (
    <>
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>Invoices</strong>
          </Typography>
        </Box>
        <Box>
          <Link href="/dashboard/invoices/new">
            <Button variant="contained" color="primary">
              New Invoice
            </Button>
          </Link>
        </Box>
      </Box>

      <Box bgcolor="white" boxShadow={2} borderRadius={3} py={6} px={3}>
        <Box mb={3}>
          <TextField
            onChange={({ target }) => setQuery(target.value)}
            variant="outlined"
            placeholder="Search invoices by customer name"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <DataFetchWrapper
          status={status}
          dataName={'Invoices'}
          hasData={invoices?.length > 0}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoices &&
                invoices.map(
                  ({ id, customerFullName, status, total, createdAt }) => (
                    <TableRow key={`invoice-${id}`}>
                      <TableCell>
                        <Link href={`/dashboard/invoices/${id}`}>
                          {customerFullName}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {format(parseISO(createdAt), 'MM/dd/yyyy')}
                      </TableCell>
                      <TableCell width="auto">
                        <Box
                          bgcolor={`${statusStyle[status]}.light`}
                          color={`white`}
                          px={1}
                          borderRadius={10}
                          width="fit-content"
                        >
                          {status}
                        </Box>
                      </TableCell>
                      <TableCell>${total}</TableCell>

                      <TableCell>
                        <Link href={`/dashboard/invoices/${id}`}>
                          <IconButton size="small" color="primary">
                            <FontAwesomeIcon icon={faArrowRight} />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            page={page - 1}
            rowsPerPage={pageLimit}
            count={queryData?.results}
            onChangePage={(_, page) => setPage(page + 1)}
            onChangeRowsPerPage={({ target }) => setPageLimit(target.value)}
          />
        </DataFetchWrapper>
      </Box>
    </>
  );
}
