const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

router.get('/', async(request, response) => {
  const blogs = await Blog.find({})
                          .populate('user',{username: 1, name: 1})

  response.json(blogs)
})


router.post('/', async (request, response) => {
  const body = request.body 
  const token = request.token//getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if( !decodedToken.id ){
    return response.status(401).json({error: 'missing token'})
  }
  const user = await User.findById(decodedToken.id) //await User.findById(body.userID)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(blog._id)
  await user.save()
      
  response.status(201).json(savedBlog)
      
} )

router.delete('/:id', async( request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({error: 'missing token'})
  }
  const user = await User.findById(decodedToken.id)

  // delete blog
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete){
    return response.status(401).json({error: 'blog does not exist'})
  }

  if (blogToDelete.user._id.toString() === user._id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({error: 'token does not match'})
  }
})


router.put('/:id', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    likes: body.likes 
  })

  await Blog.findByIdAndUpdate(request.params._id, blog, {new:true} )
  response.status(204).end()
})



module.exports = router