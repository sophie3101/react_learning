import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./NotificationReducer";
import userService from '../services/user'

// const usersSlice = createSlice({
//   name: 'users',
//   state: [],
//   reducers: {
//     setUsers(state, action){
//       return action.payload
//     }
//   }
// })

const usersReducer = (state = [], action) => {
  switch(action.type){
    case 'initialize':
      return action.users
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try{
      const users = await userService.getAllUsers()
      // console.log('users',users)
      dispatch({
        type: 'initialize',
        users
      })
    }catch(error){
      setNotification(dispatch(error, 'alert'))
    }
  }
}

export default usersReducer