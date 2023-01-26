import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/BlogReducer'
import { useEffect, useRef } from 'react'
import { initializeUser, loginUser } from './reducers/UserReducer'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlogForm from './/components/NewBlogForm'
import Togglable from './components/Togglable'
import { updateLikesInBlog, removeOneBlog, createOneBlog} from "./reducers/BlogReducer"
import { logoutUser } from "./reducers/UserReducer"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const _ = require('lodash')

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(()=>{
    dispatch(initializeUser())
  }, [])
  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1
  // console.log(useSelector(state => state))

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => [...state.blogs].sort(byLikes))

  const onLogin = (username, password) => dispatch(loginUser(username, password))
 
  const likeBlog =  (blog) =>  dispatch(updateLikesInBlog(blog)) 

  const removeBlog = (blog) => dispatch(removeOneBlog(blog))

  const createBlog = (blog) => {
    dispatch(createOneBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const logout = () => dispatch(logoutUser())

  const blogFormRef = useRef()

  // group by user
  console.log(blogs)
  console.log(_.countBy(blogs,'user.username'))
  if (user === null){
    return (
      <div>
        <Notification />
        <LoginForm onLogin={onLogin} />
      </div>
    )
  }
  else{
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          <div>
            {user.name} logged in
            <button onClick={logout}> logout</button>
          </div>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <NewBlogForm
              onCreate={createBlog}
            />
          </Togglable>

          {blogs.map(blog => 
            <Blog 
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            />
          )}
        </div>

        <h2> Users </h2>
      </div>
    )
    }
}

export default App