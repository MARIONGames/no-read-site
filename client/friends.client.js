// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post, del } = require('./http');

const sendFriendRequest = (receiverId) => {
  return post('/friends/requests', {
    receiverId
  });
};

const getIncomingFriendRequests = () => {
  return get('/friends/requests/incoming');
};

const getOutgoingFriendRequests = () => {
  return get('/friends/requests/outgoing');
};

const acceptFriendRequest = (requestId) => {
  return post(`/friends/requests/${requestId}/accept`);
};

const declineFriendRequest = (requestId) => {
  return post(`/friends/requests/${requestId}/decline`);
};

const cancelFriendRequest = (requestId) => {
  return post(`/friends/requests/${requestId}/cancel`);
};

const listFriends = () => {
  return get('/friends');
};

const removeFriend = (userId) => {
  return del(`/friends/${userId}`);
};

const getRelationship = (userId) => {
  return get(`/friends/relationship/${userId}`);
};

module.exports = {
  sendFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  listFriends,
  removeFriend,
  getRelationship
};