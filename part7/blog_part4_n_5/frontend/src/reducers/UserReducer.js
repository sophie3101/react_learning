import { createSlice } from "@reduxjs/toolkit"
import { setNotification } from "./NotificationReducer"

import userService from '../services/user'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser( state, action){
      return action.payload
    },
  }
})


export const initializeUser = () => {
  return async dispatch => {
    const userFromStorage = await userService.getUser()
    if (userFromStorage){
      dispatch(setUser(userFromStorage))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    console.log('logging out')
    userService.clearUser()
    dispatch(setUser(null))
    dispatch(setNotification('good bye!'))
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try{
      const user = await loginService.login_fetch({username, password})
      if( user.error){
        dispatch(setNotification('wrong username/password', 'alert'))
      }else{
        dispatch(setUser(user))
        userService.setUser(user)
        dispatch(setNotification(`${user.name} logged in!`))
      }
      
    }catch( error ){
      dispatch(setNotification(error,'alert'))
    }
   
  }
}

export const {setUser } = userSlice.actions 
export default userSlice.reducer