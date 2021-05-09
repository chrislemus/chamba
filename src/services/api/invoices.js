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

export { fetchInvoices, fetchInvoiceById, createInvoice };
