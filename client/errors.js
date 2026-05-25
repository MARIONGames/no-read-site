// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
class ApiClientError extends Error {
  constructor(message, options = {}) {
    super(message || 'API request failed');
    this.name = 'ApiClientError';
    this.status = options.status || 0;
    this.code = options.code || 'API_CLIENT_ERROR';
    this.details = options.details !== undefined ? options.details : null;
    this.payload = options.payload !== undefined ? options.payload : null;
    this.path = options.path || null;
    this.method = options.method || null;
  }
}

module.exports = {
  ApiClientError
};