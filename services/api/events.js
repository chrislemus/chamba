import { axiosApi } from './axiosApi';

const fetchEvents = async ({ date, days }) => {
  const res = await axiosApi.get('/events', { params: { date, days } });
  return res.data;
};

const fetchEventById = async (eventId) => {
  const res = await axiosApi.get(`/events/${eventId}`);
  return res.data;
};
const createEvent = async (event) => {
  const res = await axiosApi.post('/events', { event });
  return res.data;
};

const editEvent = async ({ eventId, event }) => {
  const res = await axiosApi.patch(`/events/${eventId}`, { event });
  return res?.data;
};
const deleteEvent = async (eventId) => {
  const res = await axiosApi.delete(`/events/${eventId}`);
  return res?.data;
};

export { fetchEvents, fetchEventById, createEvent, editEvent, deleteEvent };
