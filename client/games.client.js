// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post, patch } = require('./http');

const listGames = (params = {}) => {
  return get('/games', {
    query: params
  });
};

const getGameById = (id) => {
  return get(`/games/${id}`);
};

const getGameBySlug = (slug) => {
  return get(`/games/slug/${encodeURIComponent(slug)}`);
};

const createGame = (payload) => {
  return post('/games', payload);
};

const updateGame = (id, payload) => {
  return patch(`/games/${id}`, payload);
};

const listMyGames = () => {
  return get('/games/me/list');
};

const publishGame = (id) => {
  return post(`/games/${id}/publish`);
};

const unpublishGame = (id) => {
  return post(`/games/${id}/unpublish`);
};

const searchGames = (params = {}) => {
  return get('/games/search', {
    query: params
  });
};

const listFeaturedGames = (params = {}) => {
  return get('/games/featured', {
    query: params
  });
};

const listTrendingGames = (params = {}) => {
  return get('/games/trending', {
    query: params
  });
};

module.exports = {
  listGames,
  getGameById,
  getGameBySlug,
  createGame,
  updateGame,
  listMyGames,
  publishGame,
  unpublishGame,
  searchGames,
  listFeaturedGames,
  listTrendingGames
};