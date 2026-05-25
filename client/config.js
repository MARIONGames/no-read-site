// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const DEFAULT_API_BASE_URL = 'https://api.rubby-studios.com';

const normalizeBaseUrl = (value) => {
  if (!value || typeof value !== 'string') {
    return DEFAULT_API_BASE_URL;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return DEFAULT_API_BASE_URL;
  }

  return trimmed.replace(/\/+$/, '');
};

const getGlobalOverride = () => {
  if (typeof globalThis === 'undefined' || !globalThis) {
    return null;
  }

  if (globalThis.RUBBY_API_BASE_URL && typeof globalThis.RUBBY_API_BASE_URL === 'string') {
    return globalThis.RUBBY_API_BASE_URL;
  }

  const config = globalThis.RUBBY_CLIENT_CONFIG;
  if (config && typeof config === 'object' && typeof config.apiBaseUrl === 'string') {
    return config.apiBaseUrl;
  }

  return null;
};

const getEnvOverride = () => {
  if (typeof process === 'undefined' || !process || !process.env) {
    return null;
  }

  return process.env.RUBBY_API_BASE_URL || process.env.API_BASE_URL || null;
};

let runtimeApiBaseUrl = null;

const setApiBaseUrl = (value) => {
  runtimeApiBaseUrl = normalizeBaseUrl(value);
  return runtimeApiBaseUrl;
};

const getApiBaseUrl = () => {
  if (runtimeApiBaseUrl) {
    return runtimeApiBaseUrl;
  }

  const globalOverride = getGlobalOverride();
  if (globalOverride) {
    return normalizeBaseUrl(globalOverride);
  }

  const envOverride = getEnvOverride();
  if (envOverride) {
    return normalizeBaseUrl(envOverride);
  }

  return DEFAULT_API_BASE_URL;
};

module.exports = {
  DEFAULT_API_BASE_URL,
  normalizeBaseUrl,
  setApiBaseUrl,
  getApiBaseUrl
};