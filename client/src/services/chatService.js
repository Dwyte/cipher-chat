/*jshint esversion: 8 */

import http from "./httpService";

const apiEndpoint =
  process.env.REACT_APP_SERVICE_API || "http://localhost:4200/api";
const serviceEndpoint = apiEndpoint + "/chats";

export const getChats = async (channel, limit, config) => {
  const query = `limit=${limit}`;
  const token = localStorage.getItem("userToken");
  config["headers"] = {
    "x-auth-token": token
  };

  return await http.get(`${serviceEndpoint}/${channel}?${query}`, config);
};

export async function sendChat(msgObj, config) {
  const token = localStorage.getItem("userToken");
  config["headers"] = {
    "x-auth-token": token
  };

  return await http.post(serviceEndpoint, msgObj, config);
}

export async function getPrivateChannels(pbkHash, config) {
  const token = localStorage.getItem("userToken");
  config["headers"] = {
    "x-auth-token": token
  };

  return await http.get(
    `${serviceEndpoint}/privateChannels/${pbkHash}`,
    config
  );
}

export async function seenChat(chatId, config) {
  const token = localStorage.getItem("userToken");
  config["headers"] = {
    "x-auth-token": token
  };

  return await http.put(`${serviceEndpoint}/seen/${chatId}`, {},config);
}
