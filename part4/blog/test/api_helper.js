const Blog = require('../models/blog')
const User = require('../models/user')
const testBlogs = [
  {
    title: 'blog1',
    author: 'author1',
    url: 'url1',
    likes: 10
  },
  {
    title: 'blog2',
    author: 'author2',
    url: 'url2',
    likes: 45
  },
  {
    title: 'blog3',
    author: 'author3',
    url: 'url3',
    likes: 4
  }
]

const blogsInDB = async() => {
  const blogs = await Blog.find({})
  // console.log(blogs)
  // return blogs
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async() => {
  const users = await User.find({})
  return (await users).map(user => user.toJSON())
}
module.exports = {blogsInDB, testBlogs, usersInDB}