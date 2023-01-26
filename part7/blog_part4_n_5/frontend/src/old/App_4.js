import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/BlogReducer'
import { useEffect, useRef, useState } from 'react'
import { initializeUser, loginUser } from './reducers/UserReducer'
import { updateLikesInBlog, removeOneBlog, createOneBlog} from "./reducers/BlogReducer"
import { logoutUser } from "./reducers/UserReducer"
import { initializeUsers } from './reducers/UsersReducer'

import {Routes,Route,Link, Navigate, useParams,useNavigate,useMatch} from "react-router-dom"

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlogForm from './/components/NewBlogForm'
import Togglable from './components/Togglable'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])


  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  const user = useSelector(state => state.user)

  const users = useSelector(state => state.users)
   
  const blogs = useSelector(state => [...state.blogs].sort(byLikes))
  
  const blogFormRef = useRef()

  const match = useMatch('/users/:id')
  const selectedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  const Login = () => {
    const onLogin = (username, password) => {
      dispatch(loginUser(username, password))
    }
    return (
      <div>
      <Notification />
      <LoginForm onLogin={onLogin} />
    </div>
    )
  }

  const Blogs = () => {
    const createBlog = (blog) => {
      dispatch(createOneBlog(blog))
      blogFormRef.current.toggleVisibility()
    }
    const likeBlog =  (blog) =>  dispatch(updateLikesInBlog(blog)) 

    const removeBlog = (blog) => dispatch(removeOneBlog(blog))
    
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <NewBlogForm
            onCreate={createBlog}
          />
        </Togglable>
        <div>
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

        <div>
          <h2> Users </h2>
          {users.map(user => <User_row key={user.id} user={user}/>)}
        </div>

    </div>)
  }

  const User_row = ({user}) => {
    // return <p>{user.name} has {user.blogs.length} blogs</p>
    return (
      <div>
        <Link to={`/users/${user.id}`}>{user.name} </Link>
        has {user.blogs.length}
      </div>
    )
  }

  const Users = () => {
    const navigate = useNavigate()
    
    const logout = () => {
      dispatch(logoutUser())
      navigate('/login')
    }
  
    console.log(useSelector(state => state))
   
    return (
      <div>
        <div>
          <h2>blogs</h2>
          <Notification />
        </div>

        <div>
          {user.name} logged in
        </div>

        <div>
          <button onClick={logout}> logout</button>
        </div>

      <div>
        <Blogs />
      </div>
        
      

    </div>
    )
  }

  
 return (
  <div>
    <Routes>
      <Route path='/login' element={user ?<Navigate replace to ="/users" /> 
       : <Login />}/>
       {/* <Route path='/login' element={<Login />}/> */}
      <Route path='/users' element={<Users />}/>
      <Route path='/users/:id' element={<User user={selectedUser} />}/>
      <Route  path='/' element={user ?
         <Navigate replace to ="/users" /> 
         : <Navigate replace to ="/login" /> } />
    </Routes>
  </div>
 )
}

export default App