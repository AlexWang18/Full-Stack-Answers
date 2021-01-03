import axios from 'axios'

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    return axios
    .get(baseURL)
    .then(response => response.data)
}
function addP(person) {
    return axios
    .post(baseURL, person)
    .then(response => response.data)
}

const deleteP = (id) => {
    return axios
    .delete(baseURL+'/'+id)
    .then(r => r.data)
}

const replace = (id, person) => {
    return axios
    .put((baseURL+'/'+id), person)
    .then(r => r.data)
}

export default {
    getAll,
    addP,
    deleteP,
    replace
}