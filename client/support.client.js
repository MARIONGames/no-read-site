// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post, patch } = require('./http');

const createSupportTicket = (payload) => {
  return post('/support/tickets', payload);
};

const listMySupportTickets = (params = {}) => {
  return get('/support/tickets/me', {
    query: params
  });
};

const getMySupportTicketById = (id) => {
  return get(`/support/tickets/me/${id}`);
};

const addSupportTicketMessage = (ticketId, payload) => {
  return post(`/support/tickets/me/${ticketId}/messages`, payload);
};

const listAdminSupportTickets = (params = {}) => {
  return get('/support/admin/tickets', {
    query: params
  });
};

const getAdminSupportTicketById = (id) => {
  return get(`/support/admin/tickets/${id}`);
};

const addAdminSupportTicketMessage = (ticketId, payload) => {
  return post(`/support/admin/tickets/${ticketId}/messages`, payload);
};

const updateAdminSupportTicket = (ticketId, payload) => {
  return patch(`/support/admin/tickets/${ticketId}`, payload);
};

const assignSupportTicketToMe = (ticketId) => {
  return post(`/support/admin/tickets/${ticketId}/assign-to-me`);
};

module.exports = {
  createSupportTicket,
  listMySupportTickets,
  getMySupportTicketById,
  addSupportTicketMessage,
  listAdminSupportTickets,
  getAdminSupportTicketById,
  addAdminSupportTicketMessage,
  updateAdminSupportTicket,
  assignSupportTicketToMe
};