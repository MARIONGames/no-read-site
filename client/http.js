// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { getApiBaseUrl } = require('./config');
const { ApiClientError } = require('./errors');

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

const isFormDataLike = (value) => {
  return typeof FormData !== 'undefined' && value instanceof FormData;
};

const stringifyQueryValue = (value) => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : null;
  }

  if (typeof value === 'string') {
    return value;
  }

  return String(value);
};

const buildQueryString = (query) => {
  if (!query || typeof query !== 'object') {
    return '';
  }

  const params = new URLSearchParams();
  const keys = Object.keys(query).sort();

  for (const key of keys) {
    const value = query[key];

    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined || item === null) {
          continue;
        }

        const serializedItem = stringifyQueryValue(item);
        if (serializedItem !== null) {
          params.append(key, serializedItem);
        }
      }
      continue;
    }

    const serialized = stringifyQueryValue(value);
    if (serialized !== null) {
      params.append(key, serialized);
    }
  }

  const text = params.toString();
  return text ? `?${text}` : '';
};

const joinUrl = (baseUrl, path) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedBase = String(baseUrl || '').replace(/\/+$/, '');
  const normalizedPath = String(path || '').startsWith('/') ? String(path || '') : `/${String(path || '')}`;
  return `${normalizedBase}${normalizedPath}`;
};

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.toLowerCase().includes('application/json')) {
    try {
      return await response.json();
    } catch (error) {
      return null;
    }
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return {
      message: text
    };
  }
};

const request = async (path, options = {}) => {
  const fetchImpl = options.fetchImpl || (typeof fetch === 'function' ? fetch.bind(globalThis) : null);
  if (!fetchImpl) {
    throw new Error('Fetch API is not available in this runtime');
  }

  const method = String(options.method || 'GET').toUpperCase();
  const queryString = buildQueryString(options.query);
  const url = `${joinUrl(getApiBaseUrl(), path)}${queryString}`;
  const headers = {
    ...(options.headers || {})
  };

  const fetchOptions = {
    method,
    headers,
    credentials: options.credentials || 'include'
  };

  if (options.body !== undefined) {
    if (isFormDataLike(options.body)) {
      fetchOptions.body = options.body;
    } else if (isPlainObject(options.body) || Array.isArray(options.body)) {
      if (!fetchOptions.headers['Content-Type'] && !fetchOptions.headers['content-type']) {
        fetchOptions.headers['Content-Type'] = 'application/json';
      }
      fetchOptions.body = JSON.stringify(options.body);
    } else {
      fetchOptions.body = options.body;
    }
  }

  const response = await fetchImpl(url, fetchOptions);
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const message = payload && (payload.message || payload.error)
      ? (payload.message || payload.error)
      : `Request failed with status ${response.status}`;

    throw new ApiClientError(message, {
      status: response.status,
      code: payload && payload.code ? payload.code : 'HTTP_ERROR',
      details: payload && payload.details !== undefined ? payload.details : null,
      payload,
      path,
      method
    });
  }

  return payload;
};

const get = (path, options = {}) => {
  return request(path, {
    ...options,
    method: 'GET'
  });
};

const post = (path, body, options = {}) => {
  return request(path, {
    ...options,
    method: 'POST',
    body
  });
};

const patch = (path, body, options = {}) => {
  return request(path, {
    ...options,
    method: 'PATCH',
    body
  });
};

const put = (path, body, options = {}) => {
  return request(path, {
    ...options,
    method: 'PUT',
    body
  });
};

const del = (path, options = {}) => {
  return request(path, {
    ...options,
    method: 'DELETE'
  });
};

module.exports = {
  buildQueryString,
  request,
  get,
  post,
  patch,
  put,
  del
};