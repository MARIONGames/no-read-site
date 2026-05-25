// Copyright (c) 2026 Marios Kouretis. All Rights Reserved.
const { get, post, del } = require('./http');

const createOrganization = (payload) => {
  return post('/developers/organizations', payload);
};

const listMyOrganizations = (params = {}) => {
  return get('/developers/organizations/me', {
    query: params
  });
};

const getOrganizationById = (id) => {
  return get(`/developers/organizations/${id}`);
};

const getOrganizationBySlug = (slug) => {
  return get(`/developers/organizations/slug/${encodeURIComponent(slug)}`);
};

const listOrganizationMembers = (id) => {
  return get(`/developers/organizations/${id}/members`);
};

const createOrganizationInvite = (id, payload) => {
  return post(`/developers/organizations/${id}/invites`, payload);
};

const listOrganizationInvites = (id) => {
  return get(`/developers/organizations/${id}/invites`);
};

const listMyOrganizationInvites = () => {
  return get('/developers/invites/me');
};

const acceptOrganizationInvite = (inviteId) => {
  return post(`/developers/invites/${inviteId}/accept`);
};

const revokeOrganizationInvite = (inviteId) => {
  return post(`/developers/invites/${inviteId}/revoke`);
};

const removeOrganizationMember = (orgId, userId) => {
  return del(`/developers/organizations/${orgId}/members/${userId}`);
};

module.exports = {
  createOrganization,
  listMyOrganizations,
  getOrganizationById,
  getOrganizationBySlug,
  listOrganizationMembers,
  createOrganizationInvite,
  listOrganizationInvites,
  listMyOrganizationInvites,
  acceptOrganizationInvite,
  revokeOrganizationInvite,
  removeOrganizationMember
};