import http from './httpService';

const endpoint = "http://localhost:4200/api/users/"

export const postUser = async (data) => {
    return await http.post(endpoint, data);
}

export const getUser = async (username) => {
    const {data: res} = await http.get(`${endpoint}/${username}`);

    return Boolean(res);
}

export const authUser = async (auth) => {
    return http.post(`${endpoint}/auth/`, auth);
}