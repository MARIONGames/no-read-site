// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get } = require('./http');

const searchGames = (params = {}) => {
  return get('/discovery/search', {
    query: params
  });
};

const browseGames = (params = {}) => {
  return get('/discovery/browse', {
    query: params
  });
};

const getDiscoveryHome = () => {
  return get('/discovery/home');
};

const getDiscoveryTags = () => {
  return get('/discovery/tags');
};

const getDiscoveryGenres = () => {
  return get('/discovery/genres');
};

module.exports = {
  searchGames,
  browseGames,
  getDiscoveryHome,
  getDiscoveryTags,
  getDiscoveryGenres
};