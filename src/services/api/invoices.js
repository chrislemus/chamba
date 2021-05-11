import { axiosApi } from './axiosApi';

const fetchInvoices = async (query, pageLimit, page) => {
  const res = await axiosApi.get(
    `/invoices?query=${query}&limit=${pageLimit}&page=${page}`
  );
  return res.data;
};

const fetchInvoiceById = async (invoiceId) => {
  const res = await axiosApi.get(`/invoices/${invoiceId}`);
  return res.data;
};
const createInvoice = async (invoice) => {
  const res = await axiosApi.post('/invoices', { invoice });
  return res.data;
};
const paidInvoice = async (invoiceId) => {
  const res = await axiosApi.patch(`/invoices/${invoiceId}`, {
    invoice: { paidDate: new Date().toISOString() },
  });
  return res.data;
};

const editInvoice = async (invoiceId, invoice) => {
  const res = await axiosApi.patch(`/invoices/${invoiceId}`, { invoice });
  return res?.data;
};
const deleteInvoice = async (invoiceId) => {
  const res = await axiosApi.delete(`/invoices/${invoiceId}`);
  return res?.data;
};

export {
  fetchInvoices,
  fetchInvoiceById,
  createInvoice,
  editInvoice,
  paidInvoice,
  deleteInvoice,
};
