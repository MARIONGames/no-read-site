// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post } = require('./http');

const submitGameForReview = (gameId) => {
  return post(`/publishing/games/${gameId}/submit`);
};

const getGamePublishingStatus = (gameId) => {
  return get(`/publishing/games/${gameId}/status`);
};

const getGamePublishingHistory = (gameId) => {
  return get(`/publishing/games/${gameId}/history`);
};

const unpublishGameRelease = (gameId) => {
  return post(`/publishing/games/${gameId}/unpublish`);
};

const resubmitGameForReview = (gameId) => {
  return post(`/publishing/games/${gameId}/resubmit`);
};

const listPublishingReviewQueue = (params = {}) => {
  return get('/publishing/review-queue', {
    query: params
  });
};

const getPublishingReviewQueueGame = (gameId) => {
  return get(`/publishing/review-queue/${gameId}`);
};

const approvePublishingSubmission = (gameId, payload = {}) => {
  return post(`/publishing/review-queue/${gameId}/approve`, payload);
};

const rejectPublishingSubmission = (gameId, payload) => {
  return post(`/publishing/review-queue/${gameId}/reject`, payload);
};

module.exports = {
  submitGameForReview,
  getGamePublishingStatus,
  getGamePublishingHistory,
  unpublishGameRelease,
  resubmitGameForReview,
  listPublishingReviewQueue,
  getPublishingReviewQueueGame,
  approvePublishingSubmission,
  rejectPublishingSubmission
};