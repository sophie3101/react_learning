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
import NewBlogForm from './/components/NewBlogForm'
import Togglable from './components/Togglable'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])


  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1

  const user = useSelector(state => state.user)
 
  const users = useSelector(state => state.users)
 console.log(users)
 console.log('user ', user)
  const blogs = useSelector(state => [...state.blogs].sort(byLikes))
  
  const blogFormRef = useRef()

  const match_blogId = useMatch('/blogs/:id')
  const selectedBlog = match_blogId ? blogs.find(blog => blog.id === match_blogId.params.id) : null 
  
  const match_userId = useMatch('/users/:id')
  const selectedUser = match_userId
    ? users.find(user => user.id === match_userId.params.id)
    : null

  const Login = () => {
    const onLogin = (username, password) => {
      dispatch(loginUser(username, password))
    }
    return (
      <div>
        <LoginForm onLogin={onLogin} />
      </div>
    )
  }

  const UserDisplay = ({users}) => {
    console.log('user in display', users)
    const UserLink = ({user}) => {
      return (<tr><Link to={`/users/${user.id}`}>{user.name} </Link> HAS {user.blogs.length} blogs</tr>)
    }
    if( users === []){return null}
    return (<div>
      <h2> Users </h2>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Blog created</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
              <UserLink key={user.id} user={user}/>
          )        
          )}
        </tbody>
      </table>
     
    </div>)
  }
  const padding = { padding : 5}

  const Home = () => {
    const createBlog = (blog) => {
      dispatch(createOneBlog(blog))
      blogFormRef.current.toggleVisibility()
    }

    return (
      <div>
        <h2>Blogs</h2>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <NewBlogForm
              onCreate={createBlog}
            />
          </Togglable>
        <div>
        <div>
            {blogs.map(blog => 
              <div>
                <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const OneBlogDisplay = ({blog}) => {
    if ( blog === undefined){
      return null
    }
    else{
      return (
        <div>
          <h2>Blogs</h2>
          <h1>{blog.title} {blog.author}</h1>
          <div>
            {blog.likes} likes 
            <button onClick={() => dispatch(updateLikesInBlog(blog))}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
          <div>
            <h3>Comments</h3>
          </div>
        </div>
      )
    }
    
  }
  
  const logout = () => {   
    dispatch(logoutUser())
    navigate('/login')
  }

 return (
  <div>
    <Notification/>
    {user && 
      <div>
        <Link style={padding} to='/blogs'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
        <em>{user.name} logged in <button onClick={logout}> logout</button></em>
      </div>
      }
    <div>
      <Routes>
        <Route path='/login' element={user? <Navigate replace to ="/" /> : <Login />} /> 
        <Route path='/' element ={user? <Home /> : <Navigate replace to ='/login' />}/>
        <Route path='/blogs' element ={<Home />}/>   
        <Route path='/users' element ={<UserDisplay users={users}/>}/>  
        <Route path='/blogs/:id' element ={<OneBlogDisplay blog={selectedBlog}/>}/>   
        <Route path='/users/:id' element ={<User user={selectedUser}/>}/>   
      </Routes>
    </div>
    
  </div>
 )
}

export default App