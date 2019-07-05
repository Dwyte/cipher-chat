import http from "./httpService";

const endpoint = "http://localhost:4200/api/users";

export const getAllUsers = async () => {
  return await http.get(endpoint);
}

export const postUser = async data => {
  return await http.post(endpoint, data);
};

export const updateUser = async (_id, data) => {
  return await http.put(`${endpoint}/${_id}`, data);
}

export const checkUsername = async username => {
  const { data: res } = await http.get(`${endpoint}/${username}`);

  return Boolean(res);
};

export const authUser = async auth => {
  return http.post(`${endpoint}/auth/`, auth);
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("userToken");
  const config = {
    headers: {
      "x-auth-token": token
    }
  };

  return http.get(`${endpoint}/auth`, config);
};
