import { useSelector, useDispatch } from "react-redux"
import { useRef } from "react"
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import { updateLikesInBlog, removeOneBlog, createOneBlog} from "../reducers/BlogReducer"
import { logoutUser } from "../reducers/UserReducer"

const Blogs = () => {
  const dispatch = useDispatch()
  const byLikes = (b1, b2) => b2.likes>b1.likes ? 1 : -1
  console.log(useSelector(state => state))
  const blogs = useSelector(state => [...state.blogs].sort(byLikes))
  const user = useSelector(state => state.user)

  const likeBlog =  (blog) =>  dispatch(updateLikesInBlog(blog)) 

  const removeBlog = (blog) => dispatch(removeOneBlog(blog))

  const createBlog = (blog) => {
    dispatch(createOneBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  const logout = () => dispatch(logoutUser())

  const blogFormRef = useRef()
  return (<div>
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
  </div>)
}

export default Blogs