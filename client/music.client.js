// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const listSongs = (query = {}) => get('/music/songs', { query });
const getSong = (id) => get(`/music/songs/${encodeURIComponent(id)}`);
const uploadSong = (payload) => post('/music/upload', payload);
const startSongPlay = (id) => post(`/music/play-session/${encodeURIComponent(id)}`);
const completeSongAd = (playSessionId) => post('/music/ad-complete', { playSessionId, sessionId: playSessionId });
const getArtist = (username) => get(`/artists/${encodeURIComponent(username)}`);
const adminListSongs = () => get('/music/admin/songs');
const adminTakeDownSong = (id, reason) => post(`/music/admin/songs/${encodeURIComponent(id)}/takedown`, { reason });
const adminRestoreSong = (id) => post(`/music/admin/songs/${encodeURIComponent(id)}/restore`);
const adminBanUser = (id, reason) => post(`/music/admin/users/${encodeURIComponent(id)}/ban`, { reason });
const listPlaylists = () => get('/music/playlists');
const createPlaylist = (payload) => post('/music/playlists', payload);
const getPlaylist = (playlistId) => get(`/music/playlists/${encodeURIComponent(playlistId)}`);
const addSongToPlaylist = (playlistId, songId) => post(`/music/playlists/${encodeURIComponent(playlistId)}/songs`, { songId });

module.exports = {
  listSongs,
  getSong,
  uploadSong,
  startSongPlay,
  completeSongAd,
  getArtist,
  adminListSongs,
  adminTakeDownSong,
  adminRestoreSong,
  adminBanUser,
  listPlaylists,
  createPlaylist,
  getPlaylist,
  addSongToPlaylist
};
