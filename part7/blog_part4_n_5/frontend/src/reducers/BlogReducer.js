import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./NotificationReducer"

const blogSlice = createSlice({
  name: 'blogs',
  initialState:[],
  reducers: {
    setBlogs( state, action){
      return action.payload
    },
    updateBlog( state, action){
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },
    removeBlog( state, action ){
      const blogID = action.payload 
      return state.filter(blog => blog.id != blogID)
    },
    addBlog( state, action ){
      return state.concat(action.payload)
    }
  }
})


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateLikesInBlog = (blog) => {
  return async dispatch => {
    try{
      const blog_no_user = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
          id: blog.id,
        }
      const updatedBlog = await blogService.update(blog.id, blog_no_user)
      dispatch(updateBlog(updatedBlog))
      dispatch(setNotification(`you liked '${blog.title}' by ${blog.author}`))
    }catch (error) {
      dispatch(setNotification(error, 'alert'))
    }
  } 
}

export const removeOneBlog = (blog) => {
  return async dispatch => {
    try{
      const blogID = blog.id  
      const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`) 
      if (!ok) {
        return
      }
      await blogService.remove(blogID)
      dispatch(removeBlog(blogID))
      dispatch(setNotification(`remove ${blog.title} by ${blog.author}`))
    }catch( error ){
      dispatch(setNotification(error, 'alert'))
    }
  }
}

export const createOneBlog = (blog) => {
  return async dispatch => {
    try{
      await blogService.create(blog)
      dispatch(addBlog(blog))
      setNotification(`a new blog '${blog.title}' by ${blog.author} added`)
    }catch(error){
      dispatch(setNotification('creating a blog failed: ' + error.response.data.error, 'alert'))
    }
  }
}
export const {setBlogs, updateBlog, removeBlog, addBlog} = blogSlice.actions 
export default blogSlice.reducer