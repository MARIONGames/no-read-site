// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post, patch, del } = require('./http');

const listGameReviews = (gameId, params = {}) => {
  return get(`/games/${gameId}/reviews`, {
    query: params
  });
};

const getGameReviewSummary = (gameId) => {
  return get(`/games/${gameId}/reviews/summary`);
};

const createReview = (payload) => {
  return post('/reviews', payload);
};

const updateReview = (id, payload) => {
  return patch(`/reviews/${id}`, payload);
};

const deleteReview = (id) => {
  return del(`/reviews/${id}`);
};

const listMyReviews = (params = {}) => {
  return get('/reviews/me', {
    query: params
  });
};

const getMyReviewById = (id) => {
  return get(`/reviews/me/${id}`);
};

const markReviewHelpful = (id) => {
  return post(`/reviews/${id}/helpful`);
};

const removeReviewHelpful = (id) => {
  return del(`/reviews/${id}/helpful`);
};

module.exports = {
  listGameReviews,
  getGameReviewSummary,
  createReview,
  updateReview,
  deleteReview,
  listMyReviews,
  getMyReviewById,
  markReviewHelpful,
  removeReviewHelpful
};