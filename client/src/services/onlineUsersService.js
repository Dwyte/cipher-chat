import http from "./httpService";

const apiEndpoint =
  process.env.REACT_APP_SERVICE_API || "http://localhost:4200/api";
const serviceEndpoint = apiEndpoint + "/onlineUsers";

export async function getOnlineUsers(config) {
  const token = localStorage.getItem("userToken");
  config["headers"] = {
    "x-auth-token": token
  };

  const { data: onlineUsers } = await http.get(serviceEndpoint, config);

  return onlineUsers;
}
