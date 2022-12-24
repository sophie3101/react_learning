const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async(request, response) => {
  const users = await User.find({})
                            .populate('blogs', {title: 1, author: 1,url: 1 })
  response.json(users)
})


userRouter.post('/', async(request, response) => {
  // await User.deleteMany({})
  const {username, name,  password} = request.body
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({
    name,
    username,
    passwordHash
  })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter