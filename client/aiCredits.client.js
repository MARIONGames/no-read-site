// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const getAiCreditsBalance = () => {
  return get('/ai/credits/balance');
};

const listAiCreditsTransactions = (params = {}) => {
  return get('/ai/credits/transactions', { query: params });
};

const consumeAiCredits = (payload) => {
  return post('/ai/credits/consume', payload);
};

const adminGrantAiCredits = (payload) => {
  return post('/ai/credits/admin/grant', payload);
};

const adminAdjustAiCredits = (payload) => {
  return post('/ai/credits/admin/adjust', payload);
};

const getAdminAiCreditsUser = (userId) => {
  return get(`/ai/credits/admin/users/${userId}`);
};

const listAdminAiCreditsTransactions = (params = {}) => {
  return get('/ai/credits/admin/transactions', { query: params });
};

const getAdminAiCreditsSummary = () => {
  return get('/ai/credits/admin/summary');
};

module.exports = {
  getAiCreditsBalance,
  listAiCreditsTransactions,
  consumeAiCredits,
  adminGrantAiCredits,
  adminAdjustAiCredits,
  getAdminAiCreditsUser,
  listAdminAiCreditsTransactions,
  getAdminAiCreditsSummary
};
