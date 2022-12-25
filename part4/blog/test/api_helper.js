const Blog = require('../models/blog')
const User = require('../models/user')
const testBlogs = [
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
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