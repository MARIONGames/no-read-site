// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const registerAccount = ({ username, password, email, dateOfBirth }) => {
  return post('/auth/register', {
    username,
    password,
    email,
    dateOfBirth
  });
};

const loginAccount = ({ username, password }) => {
  return post('/auth/login', {
    username,
    password
  });
};

const logoutAccount = () => {
  return post('/auth/logout');
};

const getAuthMe = () => {
  return get('/auth/me');
};

const getAuthStatus = () => {
  return get('/auth/status');
};

module.exports = {
  registerAccount,
  loginAccount,
  logoutAccount,
  getAuthMe,
  getAuthStatus
};