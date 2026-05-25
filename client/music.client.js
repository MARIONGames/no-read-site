// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const listSongs = (query = {}) => get('/music/songs', { query });
const getSong = (id) => get(`/music/songs/${encodeURIComponent(id)}`);
const uploadSong = (payload) => post('/music/songs', payload);
const startSongPlay = (id) => post(`/music/songs/${encodeURIComponent(id)}/play`);
const completeSongAd = (sessionId) => post(`/music/play-sessions/${encodeURIComponent(sessionId)}/complete-ad`);
const getArtist = (username) => get(`/music/artists/${encodeURIComponent(username)}`);
const adminListSongs = () => get('/music/admin/songs');
const adminTakeDownSong = (id, reason) => post(`/music/admin/songs/${encodeURIComponent(id)}/take-down`, { reason });
const adminRestoreSong = (id) => post(`/music/admin/songs/${encodeURIComponent(id)}/restore`);

module.exports = {
  listSongs,
  getSong,
  uploadSong,
  startSongPlay,
  completeSongAd,
  getArtist,
  adminListSongs,
  adminTakeDownSong,
  adminRestoreSong
};
