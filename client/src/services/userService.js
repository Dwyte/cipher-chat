/*jshint esversion: 8 */

import http from "./httpService";

const apiEndpoint =
  process.env.REACT_APP_SERVICE_API || "http://localhost:4200/api";
const serviceEndpoint = apiEndpoint + "/users";

export const searchUsers = async (searchData, config) => {
  return await http.put(serviceEndpoint + "/searchUser", searchData, config);
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
  const { data } = await http.post(`${serviceEndpoint}/auth/`, auth);

  return data;
};

export const getUserProfile = async config => {
  const token = localStorage.getItem("userToken");
  config["headers"] = {
    "x-auth-token": token
  };

  return http.get(`${serviceEndpoint}/auth`, config);
};
