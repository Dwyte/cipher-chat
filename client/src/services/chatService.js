/*jshint esversion: 8 */

import http from "./httpService";

const apiEndpoint =
  process.env.REACT_APP_SERVICE_API || "http://localhost:4200/api";
const serviceEndpoint = apiEndpoint + "/chats";

export const getChats = async (filterData, config) => {
  const token = localStorage.getItem("userToken");
  config["headers"] = {
    "x-auth-token": token
  };

  return await http.put(serviceEndpoint, filterData, config);
};
