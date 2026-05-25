// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const listNotifications = (params = {}) => {
  return get('/notifications', {
    query: params
  });
};

const getNotificationById = (id) => {
  return get(`/notifications/${id}`);
};

const getUnreadNotificationCount = () => {
  return get('/notifications/unread-count');
};

const markNotificationRead = (id) => {
  return post(`/notifications/${id}/read`);
};

const markAllNotificationsRead = () => {
  return post('/notifications/read-all');
};

module.exports = {
  listNotifications,
  getNotificationById,
  getUnreadNotificationCount,
  markNotificationRead,
  markAllNotificationsRead
};