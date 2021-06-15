import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from 'react-query';
import DataFetchWrapper from '../../../components/DataFetchWrapper';
import { fetchCustomers } from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Box,
  Button,
  Typography,
  IconButton,
  TablePagination,
} from '@material-ui/core';
import {
  faArrowRight,
  faEdit,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
export default function Customers() {
  const [query, setQuery] = useState('');
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { status, data } = useQuery(
    ['customers', { query, pageLimit, page }],
    () => fetchCustomers(query, pageLimit, page)
  );

  const customers = data?.customers;
  const queryData = data?.queryData;

  return (
    <>
      <Box display="flex" mb={5}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            <strong>Customers</strong>
          </Typography>
        </Box>
        <Box>
          <Link href="/dashboard/customers/new">
            <Button color="primary" variant="contained">
              Add Customer
            </Button>
          </Link>
        </Box>
      </Box>

      <Box bgcolor="white" boxShadow={2} borderRadius={3} py={6} px={5}>
        <Box mb={3}>
          <TextField
            onChange={({ target }) => setQuery(target.value)}
            variant="outlined"
            placeholder="Search customers"
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
          dataName={'Customers'}
          hasData={customers?.length > 0}
        >
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {customers &&
                  customers.map(
                    ({
                      id,
                      fullName,
                      email,
                      phoneMobile,
                      phoneHome,
                      avatar,
                    }) => (
                      <TableRow key={'client' + id}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar src={avatar}>
                              {fullName
                                .split(' ')
                                .map((name) => name[0])
                                .join('')
                                .toUpperCase()}
                            </Avatar>
                            <Box pl={2}>
                              <Link href={`/dashboard/customers/${id}`}>
                                {fullName}
                              </Link>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {email?.length ? (
                            <a href={`mailto:${email}`} target="_blank">
                              {email}
                            </a>
                          ) : (
                            '--'
                          )}
                        </TableCell>
                        <TableCell>
                          {phoneMobile || phoneHome || '--'}
                        </TableCell>
                        <TableCell size="small">
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            width="min-content"
                          >
                            <Link href={`/dashboard/customers/${id}/edit`}>
                              <IconButton size="small" color="primary">
                                <FontAwesomeIcon icon={faEdit} />
                              </IconButton>
                            </Link>
                            <Box width="1.5em" />
                            <Link href={`/dashboard/customers/${id}`}>
                              <IconButton size="small" color="primary">
                                <FontAwesomeIcon icon={faArrowRight} />
                              </IconButton>
                            </Link>
                          </Box>
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
          </>
        </DataFetchWrapper>
      </Box>
    </>
  );
}
