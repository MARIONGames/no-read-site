// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, patch } = require('./http');

const getCurrentUserProfile = () => {
  return get('/users/me');
};

const updateCurrentUserProfile = (payload) => {
  return patch('/users/me/profile', payload);
};

const getCurrentUserSettings = () => {
  return get('/users/me/settings');
};

const updateCurrentUserSettings = (payload) => {
  return patch('/users/me/settings', payload);
};

const getPublicUserById = (id) => {
  return get(`/users/${id}`);
};

const getPublicUserByUsername = (username) => {
  return get(`/users/username/${encodeURIComponent(username)}`);
};

const changeEmail = (payload) => {
  return patch('/users/me/account/email', payload);
};

const changePassword = (payload) => {
  return patch('/users/me/account/password', payload);
};

module.exports = {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getCurrentUserSettings,
  updateCurrentUserSettings,
  getPublicUserById,
  getPublicUserByUsername,
  changeEmail,
  changePassword
};