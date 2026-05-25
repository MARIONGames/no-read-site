// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const config = require('./config');
const http = require('./http');
const errors = require('./errors');

const auth = require('./auth.client');
const users = require('./users.client');
const friends = require('./friends.client');
const games = require('./games.client');
const discovery = require('./discovery.client');
const library = require('./library.client');
const notifications = require('./notifications.client');
const reviews = require('./reviews.client');
const support = require('./support.client');
const reports = require('./reports.client');
const developers = require('./developers.client');
const publishing = require('./publishing.client');
const admin = require('./admin.client');
const system = require('./system.client');
const aiCredits = require('./aiCredits.client');
const music = require('./music.client');

module.exports = {
  config,
  http,
  errors,
  auth,
  users,
  friends,
  games,
  discovery,
  library,
  notifications,
  reviews,
  support,
  reports,
  developers,
  publishing,
  admin,
  system,
  aiCredits,
  music,
  ...auth,
  ...users,
  ...friends,
  ...games,
  ...discovery,
  ...library,
  ...notifications,
  ...reviews,
  ...support,
  ...reports,
  ...developers,
  ...publishing,
  ...admin,
  ...system,
  ...aiCredits,
  ...music
};