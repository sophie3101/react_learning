import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const login_fetch = async credentials => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
};
  return fetch(`http://localhost:3003/api/login`, requestOptions)
    .then(response => response.json())
}

export default { login, login_fetch }