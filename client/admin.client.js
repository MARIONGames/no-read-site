// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const getAdminDashboard = () => {
  return get('/admin/dashboard');
};

const getAdminQueues = () => {
  return get('/admin/queues');
};

const getAdminActivity = (params = {}) => {
  return get('/admin/activity', { query: params });
};

const listAdminAuditEvents = (params = {}) => {
  return get('/admin/audit', { query: params });
};

const getAdminAuditEventById = (id) => {
  return get(`/admin/audit/${id}`);
};

const searchAdminEntities = (params = {}) => {
  return get('/admin/search', { query: params });
};

const adminGetUser = (id) => {
  return get(`/admin/users/${id}`);
};

const adminBanUser = (id, reason) => {
  return post(`/admin/users/${id}/ban`, { reason });
};

const adminUnbanUser = (id, reason) => {
  return post(`/admin/users/${id}/unban`, { reason });
};

module.exports = {
  getAdminDashboard,
  getAdminQueues,
  getAdminActivity,
  listAdminAuditEvents,
  getAdminAuditEventById,
  searchAdminEntities,
  adminGetUser,
  adminBanUser,
  adminUnbanUser
};
