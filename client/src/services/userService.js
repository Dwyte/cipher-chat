/*jshint esversion: 8 */

import http from './httpService';

const apiEndpoint =
  process.env.REACT_APP_SERVICE_API || 'http://localhost:4200/api';
const serviceEndpoint = apiEndpoint + '/users';

export const getAllUsers = async () => {
  return await http.get(serviceEndpoint);
};

export const postUser = async data => {
  return await http.post(serviceEndpoint, data);
};

export const updateUser = async (_id, data) => {
  return await http.put(`${serviceEndpoint}/${_id}`, data);
};

export const checkUsername = async username => {
  const { data: res } = await http.get(`${serviceEndpoint}/${username}`);

  return Boolean(res);
};

export const authUser = async auth => {
  return http.post(`${serviceEndpoint}/auth/`, auth);
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('userToken');
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  return http.get(`${serviceEndpoint}/auth`, config);
};
