var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesNum = blogs.reduce( (accum, current) => accum + current.likes, 0)
  return likesNum
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const maxLikeNum = Math.max(...likes)
  const favoriteBlog = blogs.find(blog => blog.likes === maxLikeNum)
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  // return author who has the large amount of blog
  authors = blogs.map(blog => blog.author)
  author_count = _.countBy(authors)
  // console.log(author_count.values())
  // console.log(_.maxBy(author_count, function(o){return o.}))
}
module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}