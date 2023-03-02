const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { v1: uuid } = require('uuid')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type User {
    username: String!,
    friends: [Author!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!,
    born: Int,
    bookCount: Int!,
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres:[String],
    id: ID!
  }

  type Query {
    authorCount: Int!,
    bookCount: Int!,
    allBooks(author: String, genre: String):[Book!]!,
    allAuthors: [Author!],
    me: User
  }

  type Mutation{
    addBook(
      title: String!,
      author:String!,
      published: Int!,
      genres: [String!]
    ):Book,

    editAuthor(
      name: String!, 
      setBornTo: Int!
    ): Author 

    createUser(
      username: String!
    ):User

    login (
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => {
      const booksByAuthor = books.filter(b => b.author === root.name)
    
      if( booksByAuthor === undefined){
        return 0
      }
      return booksByAuthor.length
    },
  },
  Query:{
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.author && !args.genres){
        return await Book.find({})
      }else{
        const books = await Book.find({author: args.name})
        books = Book.find({'genres': args.genre})
        return books
      }
   
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation:{
    addBook: async(root, args) => {
      const book = new Book({...args})
      try{
        await book.save()
      }catch(error){
        throw new GraphQLError('Saving book failed', 
        {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
      return book
    },
    editAuthor: async(root, args) => {
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      try{
        await author.save()
      }catch(error){
        throw new GraphQLError('Edit number failed', {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.name,
          error
        })
      }
      return author
    },
    createUser: async(root,args) => {
      const user = new User({username: args.username})
      return user.save()
                .catch(error => {
                  throw new GraphQLError('Create the user failed',{
                    extensions: {
                      code: 'BAD_USER_INPUT',
                      invalidArgs: args.username,
                      error
                    }
                  })
                })
    },
    login: async(root,args) => {
      const user = await User.findOne({username: args.username})
      if ( !user){
        throw new GraphQLError('wrong credential', {
          extensions: 'BAD_USER_INPUT'
        })
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }
      console.log('user for token',userForToken)
      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    console.log(auth)
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})
