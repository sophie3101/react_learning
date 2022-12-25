const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./api_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('test get method', () => {
  beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.testBlogs)
    // const blogObjs =  testBlogs.map(blog => new Blog(blog))
    // const promiseArray = blogObjs.map(blogObj => blogObj.save())
    // await Promise.all(promiseArray)
  })
  test('all blogs are returned as json', async () => {
    await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    expect (response.body).toHaveLength(helper.testBlogs.length)
  })

  test('unique identifier', async () => {
    const response = await api.get('/api/blogs')
    // const ids = response.body.map(blog => blog.id)
    // ids.forEach(id => expect(id).toBeDefined())
    expect(response.body[0].id).toBeDefined()
  })

  test('check specific blog', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('Canonical string reduction')
  })

  // test.only('delete on blog', async () => {
  //   const aBlogAtStart = (await helper.blogsInDB())[0]

  //   await api
  //     .delete(`/api/blogs/${aBlogAtStart.id}`)
  //     .expect(204)

  //     const blogsAtEnd = await helper.blogsInDB()
  //     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  //     const titles = blogsAtEnd.map(b => b.title)
  //     expect(titles).not.toContain(aBlogAtStart.title)
  // })
})

describe('test post method', () => {
  let token
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const response = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

    token = response.body.token
  })
  test('add one blog', async () => {
    const newBlog = {
      title: 'blog5',
      author: 'author5',
      url: 'url5',
      likes: 10,
    }
    await api.post('/api/blogs')
              .send(newBlog)
              .set('Authorization', `bearer ${token}`)
              .expect(201)
              .expect('Content-Type',/application\/json/)

    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.testBlogs.length + 1)
    const titles = response.body.map(res => res.title)
    expect(titles).toContain('blog5')
  })

  test('add blog without likes', async () => {
    const newBlog = {
      title: 'blog6',
      author: 'author6',
      url: 'url6',
    }
    const blogsBefore = await helper.blogsInDB()
    await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDB()
    expect(blogs).toHaveLength(blogsBefore.length + 1)
    // expect(blogs).toContain({...newBlog, likes: 0})
  })

  test('add blog with missing title', async () => {
    const newBlog = {
      author: 'author6',
      url: 'url6',
      likes: 9
    }
    await api.post('/api/blogs')
              .send(newBlog)
              .set('Authorization', `bearer ${token}`)
              .expect(400)
  })
})


describe('test user', () => {
  //adding one user to test database
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('add user', async() => {
    const userBefore = await helper.usersInDB()
 
    const newUser = {
      username: 'newUserName',
      name: 'same',
      password: 'secret'
    }

    await api.post('/api/users')
              .send(newUser)
              .expect(201)
              .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDB()
    expect(usersAfter).toHaveLength(userBefore.length + 1)

    const usernames = usersAfter.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('add duplicated username', async() => {
    const userBefore = await helper.usersInDB()
 
    const newUser = {
      username: userBefore[0].username,
      name: 'same',
      password: 'secret'
    }

    const result = await api.post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('User validation failed')
  })

  test('username failed', async() => {
    const newUser = {
      username: 'fa',
      name: 'same',
      password: 'secret'
    }

    const result = await api.post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('User validation failed:')
  })
})








afterAll( () => {
  mongoose.connection.close()
})