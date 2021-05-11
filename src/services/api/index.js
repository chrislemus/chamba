import { axiosApi } from './axiosApi';

import {
  fetchCustomers,
  fetchCustomerById,
  addNewCustomer,
  editCustomer,
  deleteCustomer,
} from './customers';

import {
  fetchInvoices,
  fetchInvoiceById,
  createInvoice,
  editInvoice,
  paidInvoice,
  deleteInvoice,
} from './invoices';

export {
  fetchCustomers,
  fetchCustomerById,
  addNewCustomer,
  editCustomer,
  deleteCustomer,
  axiosApi,
  fetchInvoices,
  fetchInvoiceById,
  createInvoice,
  editInvoice,
  paidInvoice,
  deleteInvoice,
};
