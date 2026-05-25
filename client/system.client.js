// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get } = require('./http');

const getSystemStatus = () => {
  return get('/system/status');
};

const getSystemReadiness = () => {
  return get('/system/readiness');
};

const getSystemFeatures = () => {
  return get('/system/features');
};

const getSystemBuild = () => {
  return get('/system/build');
};

module.exports = {
  getSystemStatus,
  getSystemReadiness,
  getSystemFeatures,
  getSystemBuild
};