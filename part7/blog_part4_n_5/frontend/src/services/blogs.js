import axios from 'axios'
import userService  from './user'
// axios.defaults.port = 3003;
const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    },
  }
}

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => response.data)
  // const allData = fetch("http://localhost:3003/api/blogs")
  //                 .then( (response) => response.json())
  //                 .then((data) => data)
  // return allData
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = (id, blog) => {
  // const request = axios.put(`${baseUrl}/${id}`, newObject)
  // return request.then(response => response.data)
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog)
};
  return fetch(`http://localhost:3003/api/blogs/${id}`, requestOptions)
    .then(response => response.json())
    // .then(data => element.innerHTML = data.id );
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config())
}

export default { getAll, create, update, remove }