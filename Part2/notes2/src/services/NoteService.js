import axios from 'axios'

const baseURL = 'http://localhost:3001/notes'

//returning the response / promise from db
const getAll = () => {
    const request = axios.get(baseURL)
    const nonExisting = {
        id: 10304, 
        content: 'this note is not in the db',
        date: '2019-05-30T17:30:31.098Z',
        important: true
    }
    return request
        .then(response => response.data.concat(nonExisting)) //still returns a promise, then function returns a promise, "promise chaining"
}

const create = (noteObj) => {
    const request = axios.post(baseURL, noteObj)
    return request.then(response => response.data)
}

const update = (id, changedNote) => {
    return axios.put(`${baseURL}/${id}`, changedNote).then(response => response.data)
}

const clear = (len) => {
    for(let i = 1; i <= len; i++){
        axios
        .delete(baseURL+'/'+i)
    }
}

const ns = {
    getAll,
    create, 
    update,
    clear
}

//returns an object with all 3 of the functions as properties, 
export default ns

