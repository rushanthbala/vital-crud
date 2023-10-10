import axios from 'axios';

const usersUrl = 'https://tame-plum-spider-gown.cyclic.app';
// const usersUrl = 'http://localhost:8000';

export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}


export const addUser = async (url,user) => {
    return await axios.post(`${usersUrl}/${url}`, user);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (id, user) => {
    return await axios.patch(`${usersUrl}/${id}`, user)
}