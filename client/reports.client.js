// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post, patch } = require('./http');

const createReport = (payload) => {
  return post('/reports', payload);
};

const listMyReports = (params = {}) => {
  return get('/reports/me', {
    query: params
  });
};

const getMyReportById = (id) => {
  return get(`/reports/me/${id}`);
};

const listModerationReports = (params = {}) => {
  return get('/moderation/reports', {
    query: params
  });
};

const getModerationReportById = (id) => {
  return get(`/moderation/reports/${id}`);
};

const updateModerationReportStatus = (id, payload) => {
  return patch(`/moderation/reports/${id}/status`, payload);
};

module.exports = {
  createReport,
  listMyReports,
  getMyReportById,
  listModerationReports,
  getModerationReportById,
  updateModerationReportStatus
};