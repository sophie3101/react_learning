import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import blogReducer from './reducers/BlogReducer'
import userReducer from './reducers/UserReducer'
import notificationReducer from './reducers/NotificationReducer'
import usersReducer from './reducers/UsersReducer'
import {BrowserRouter as Router} from  "react-router-dom"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer, //signed in user
    notification: notificationReducer,
    users: usersReducer
  },
});

// ReactDOM.render(<Provider store={store}>
//   <App />
// </Provider>
// , document.getElementById('root'))

ReactDOM.render(<Provider store={store}>
 <Router><App /></Router>
</Provider>
, document.getElementById('root'))
