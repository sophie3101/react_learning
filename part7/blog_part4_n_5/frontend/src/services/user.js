import axios from "axios"

let token = null

const STORAGE_KEY = 'loggedBlogAppUser'

const setUser = (user) => {
  window.localStorage.setItem(
    STORAGE_KEY, JSON.stringify(user)
  )
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }

  return null
}

const getAllUsers = async() => {
  const baseUrl = '/api/users'
  const response = await axios.get(baseUrl)
  return response.data
}
const clearUser =  () => {
   localStorage.clear()
  // window.localStorage.removeItem(STORAGE_KEY)
  token = null
}

const getToken = () => token

export default {
  setUser, getUser, clearUser, getToken, getAllUsers
}