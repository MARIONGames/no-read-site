// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const listLibrary = (params = {}) => {
  return get('/library', {
    query: params
  });
};

const getLibraryEntryById = (id) => {
  return get(`/library/${id}`);
};

const getLibraryEntryByGameId = (gameId) => {
  return get(`/library/game/${gameId}`);
};

const claimGame = (gameId) => {
  return post('/library/claim', {
    gameId
  });
};

const adminGrantGame = (payload) => {
  return post('/library/admin/grants', payload);
};

const adminRevokeGame = (payload) => {
  return post('/library/admin/revoke', payload);
};

module.exports = {
  listLibrary,
  getLibraryEntryById,
  getLibraryEntryByGameId,
  claimGame,
  adminGrantGame,
  adminRevokeGame
};