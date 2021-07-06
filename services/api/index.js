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

import {
  fetchEvents,
  fetchEventById,
  createEvent,
  editEvent,
  deleteEvent,
} from './events';

import { authUser, getUserData, userSignUp } from './user';

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
  authUser,
  getUserData,
  userSignUp,
  fetchEvents,
  fetchEventById,
  createEvent,
  editEvent,
  deleteEvent,
};
