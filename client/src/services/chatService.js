import http from "./httpService";

const apiEndpoint =
  process.env.REACT_APP_SERVICE_API || "http://localhost:4200/api";
const serviceEndpoint = apiEndpoint + "/chats";

export const getChats = async (filter) => {
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      "x-auth-token": token
    }
  };

  return await http.put(serviceEndpoint, filter, config);
};
