// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
// No Read browser client for auth, profiles, music, artists, upload, and owner tools.
(function () {
  'use strict';

  const API_BASE_URL = 'https://api.rubby-studios.com';
  const TOKEN_STORAGE_KEY = 'NO_READ_AUTH_TOKEN';
  const USER_STORAGE_KEY = 'NO_READ_AUTH_USER';

  const normalizeBaseUrl = (value) => String(value || API_BASE_URL).trim().replace(/\/+$/, '');

  const buildQueryString = (query) => {
    if (!query || typeof query !== 'object') return '';
    const params = new URLSearchParams();
    Object.keys(query).sort().forEach((key) => {
      const value = query[key];
      if (value === undefined || value === null || value === '') return;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (item !== undefined && item !== null && item !== '') params.append(key, String(item));
        });
      } else {
        params.append(key, value instanceof Date ? value.toISOString() : String(value));
      }
    });
    const text = params.toString();
    return text ? `?${text}` : '';
  };

  const joinUrl = (baseUrl, path) => {
    if (/^https?:\/\//i.test(path)) return path;
    const normalizedPath = String(path || '').startsWith('/') ? String(path || '') : `/${String(path || '')}`;
    return `${normalizeBaseUrl(baseUrl)}${normalizedPath}`;
  };

  const parseResponseBody = async (response) => {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.toLowerCase().includes('application/json')) {
      try { return await response.json(); } catch (error) { return null; }
    }
    const text = await response.text();
    if (!text) return null;
    try { return JSON.parse(text); } catch (error) { return { message: text }; }
  };

  const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY) || '';
  const setStoredToken = (token) => { if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token); };
  const clearStoredToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

  const TOKEN_KEY_NAMES = new Set([
    'token', 'accessToken', 'access_token', 'authToken', 'auth_token',
    'jwt', 'sessionToken', 'session_token', 'bearerToken', 'bearer_token'
  ]);

  const looksLikeToken = (value) => typeof value === 'string' && value.length >= 16 && !value.includes(' ');

  const findToken = (payload, seen = new Set()) => {
    if (!payload || typeof payload !== 'object' || seen.has(payload)) return null;
    seen.add(payload);
    for (const [key, value] of Object.entries(payload)) {
      if (TOKEN_KEY_NAMES.has(key) && looksLikeToken(value)) return value;
      if (value && typeof value === 'object') {
        const nested = findToken(value, seen);
        if (nested) return nested;
      }
    }
    return null;
  };

  const findUser = (payload, seen = new Set()) => {
    if (!payload || typeof payload !== 'object' || seen.has(payload)) return null;
    seen.add(payload);
    if (payload.user && typeof payload.user === 'object') return payload.user;
    if (payload.account && typeof payload.account === 'object') return payload.account;
    if (payload.profile && typeof payload.profile === 'object' && (payload.profile.username || payload.profile.userId || payload.profile.id)) return payload.profile;
    if (payload.username || payload.email || payload.id || payload.userId || payload._id) return payload;
    for (const value of Object.values(payload)) {
      if (value && typeof value === 'object') {
        const nested = findUser(value, seen);
        if (nested) return nested;
      }
    }
    return null;
  };

  const saveUser = (user) => { if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)); };
  const getSavedUser = () => {
    try { return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null'); }
    catch (error) { return null; }
  };
  const clearSavedUser = () => localStorage.removeItem(USER_STORAGE_KEY);

  const extractAuthUser = (payload, fallback = {}) => {
    const user = findUser(payload) || fallback || null;
    if (!user || typeof user !== 'object') return null;
    return user;
  };

  const isAuthenticatedPayload = (payload) => {
    if (!payload || typeof payload !== 'object') return false;
    if (payload.authenticated === true || payload.loggedIn === true) return true;
    if (payload.success === true && (payload.user || payload.data?.user || payload.data?.profile)) return true;
    if (payload.data && (payload.data.authenticated === true || payload.data.loggedIn === true)) return true;
    return false;
  };

  const getRoleList = (user = getSavedUser()) => {
    const safe = user && typeof user === 'object' ? user : {};
    const roles = [];
    if (Array.isArray(safe.roles)) roles.push(...safe.roles);
    if (typeof safe.role === 'string') roles.push(safe.role);
    if (typeof safe.primaryRole === 'string') roles.push(safe.primaryRole);
    return [...new Set(roles.filter(Boolean).map((role) => String(role).toLowerCase()))];
  };

  const hasAnyRole = (roles, user = getSavedUser()) => {
    const owned = getRoleList(user);
    return roles.some((role) => owned.includes(String(role).toLowerCase()));
  };

  const getDisplayNameFromUser = (user) => {
    const safe = user && typeof user === 'object' ? user : getSavedUser();
    return (safe && (safe.displayName || safe.artistName || safe.username || safe.name || safe.email || safe.id || safe.userId || safe._id))
      ? String(safe.displayName || safe.artistName || safe.username || safe.name || safe.email || safe.id || safe.userId || safe._id)
      : '';
  };

  const request = async (path, options = {}) => {
    const method = String(options.method || 'GET').toUpperCase();
    const url = `${joinUrl(API_BASE_URL, path)}${buildQueryString(options.query)}`;
    const headers = { ...(options.headers || {}) };
    const token = getStoredToken();

    if (token && !headers.Authorization && !headers.authorization) {
      headers.Authorization = `Bearer ${token}`;
    }

    const fetchOptions = {
      method,
      headers,
      credentials: options.credentials || 'include',
      mode: 'cors'
    };

    if (options.body !== undefined) {
      if (options.body instanceof FormData) {
        fetchOptions.body = options.body;
      } else if (typeof options.body === 'object') {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        fetchOptions.body = JSON.stringify(options.body);
      } else {
        fetchOptions.body = options.body;
      }
    }

    let response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (error) {
      throw new Error('Could not connect to the No Read server. Make sure the server and Cloudflare tunnel are online.');
    }

    const payload = await parseResponseBody(response);
    if (!response.ok) {
      let message = payload && (payload.message || payload.error)
        ? (payload.message || payload.error)
        : `Request failed with status ${response.status}`;

      if (response.status === 401 || response.status === 403) {
        const cleanPath = String(path || '').toLowerCase();
        if (cleanPath.includes('/auth/login')) {
          message = 'Login was rejected by the server. Check username/password and make sure /auth/login is public.';
        } else if (cleanPath.includes('/auth/register')) {
          message = 'Register was rejected by the server. Check that /auth/register is public.';
        } else {
          message = 'You are not logged in or your role cannot access this action.';
        }
      }

      const err = new Error(message);
      err.status = response.status;
      err.payload = payload;
      err.path = path;
      throw err;
    }

    const tokenFromResponse = findToken(payload);
    if (tokenFromResponse) setStoredToken(tokenFromResponse);

    const userFromResponse = findUser(payload);
    if (userFromResponse) saveUser(userFromResponse);

    return payload;
  };

  const requestFirst = async (paths, options = {}) => {
    const list = Array.isArray(paths) ? paths : [paths];
    let lastError = null;
    for (const path of list) {
      try {
        return await request(path, options);
      } catch (error) {
        lastError = error;
        if (![404, 405].includes(error.status)) throw error;
      }
    }
    throw lastError || new Error('No endpoint matched this request.');
  };

  const getSessionState = async ({ verify = true } = {}) => {
    const savedUser = getSavedUser();
    const savedToken = getStoredToken();
    if (!verify) {
      return { loggedIn: Boolean(savedUser || savedToken), user: savedUser, source: savedUser || savedToken ? 'local' : 'none' };
    }

    try {
      const statusPayload = await request('/auth/status');
      if (isAuthenticatedPayload(statusPayload)) {
        const user = extractAuthUser(statusPayload, savedUser || {});
        if (user) saveUser(user);
        return { loggedIn: true, user, source: 'server', payload: statusPayload };
      }
    } catch (ignored) {}

    try {
      const mePayload = await request('/auth/me');
      const user = extractAuthUser(mePayload, savedUser || {});
      if (user) saveUser(user);
      return { loggedIn: true, user, source: 'server', payload: mePayload };
    } catch (ignored) {}

    return { loggedIn: Boolean(savedUser || savedToken), user: savedUser, source: savedUser || savedToken ? 'local' : 'none' };
  };

  const getId = (item) => item && (item.id || item._id || item.songId || item.userId);

  const api = {
    apiBaseUrl: () => API_BASE_URL,
    request,
    requestFirst,
    registerAccount: ({ username, password, email, dateOfBirth }) => request('/auth/register', { method: 'POST', body: { username, password, email, dateOfBirth } }),
    loginAccount: async ({ username, password }) => {
      const payload = await request('/auth/login', { method: 'POST', body: { username, password } });
      const user = extractAuthUser(payload, { username });
      if (user) saveUser(user);
      return payload;
    },
    logoutAccount: async () => {
      try { return await request('/auth/logout', { method: 'POST' }); }
      finally { clearStoredToken(); clearSavedUser(); }
    },
    getAuthMe: () => request('/auth/me'),
    getAuthStatus: () => request('/auth/status'),
    rawLoginTest: ({ username, password }) => request('/auth/login', { method: 'POST', body: { username, password } }),

    listSongs: (query) => request('/music/songs', { query }),
    getSong: (id) => requestFirst([`/music/songs/${encodeURIComponent(id)}`, `/songs/${encodeURIComponent(id)}`]),
    uploadSong: (payload) => requestFirst(['/music/upload', '/music/songs'], { method: 'POST', body: payload }),
    startSongPlay: (id) => requestFirst([`/music/play-session/${encodeURIComponent(id)}`, `/music/songs/${encodeURIComponent(id)}/play`], { method: 'POST' }),
    completeSongAd: (sessionId) => requestFirst(['/music/ad-complete', `/music/play-sessions/${encodeURIComponent(sessionId)}/complete-ad`], { method: 'POST', body: { playSessionId: sessionId, sessionId } }),
    getArtist: (username) => requestFirst([`/artists/${encodeURIComponent(username)}`, `/music/artists/${encodeURIComponent(username)}`]),
    adminListSongs: () => requestFirst(['/music/admin/songs', '/admin/songs']),
    adminTakeDownSong: (id, reason) => requestFirst([`/music/admin/songs/${encodeURIComponent(id)}/takedown`, `/music/admin/songs/${encodeURIComponent(id)}/take-down`], { method: 'POST', body: { reason } }),
    adminRestoreSong: (id) => request(`/music/admin/songs/${encodeURIComponent(id)}/restore`, { method: 'POST' }),
    adminBanUser: (id, reason) => requestFirst([`/music/admin/users/${encodeURIComponent(id)}/ban`, `/admin/users/${encodeURIComponent(id)}/ban`], { method: 'POST', body: { reason } }),
    getMyUserProfile: () => requestFirst(['/profile/me', '/users/me']),
    updateMyUserProfile: (payload) => requestFirst(['/profile/me', '/users/me/profile'], { method: 'PATCH', body: payload }),
    getStreamUrl: (songId, sessionId) => `${API_BASE_URL}/music/stream/${encodeURIComponent(songId)}?playSessionId=${encodeURIComponent(sessionId)}&sessionId=${encodeURIComponent(sessionId)}`,

    hasStoredToken: () => Boolean(getStoredToken()),
    isLocallyLoggedIn: () => Boolean(getStoredToken() || getSavedUser()),
    getSessionState,
    getDisplayName: () => getDisplayNameFromUser(),
    getRoleList,
    hasAnyRole,
    extractAuthUser,
    getSavedUser,
    saveUser,
    getStoredToken,
    getId,
    clearLocalSession: () => { clearStoredToken(); clearSavedUser(); }
  };

  window.NoReadAuth = api;
})();
