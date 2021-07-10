import { axiosApi } from './axiosApi';

import {
  fetchCustomers,
  fetchCustomerById,
  addNewCustomer,
  editCustomer,
  deleteCustomer,
  customerEvents,
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
  customerEvents,
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
