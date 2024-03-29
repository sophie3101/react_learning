const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

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
  type Author {
    name: String!,
    born: Int,
    bookCount: Int!,
  }
  type Book {
    title: String!,
    published: Int!,
    author: String!,
    genres:[String]
  }
  type Query {
    authorCount: Int!,
    bookCount: Int!,
    allBooks(author: String, genre: String):[Book!],
    allAuthors: [Author!]
  }
  type Mutation{
    addBook(
      title: String!,
      author:String!,
      published: Int!,
      genres: [String!]
    ):Book,
    editAuthor(name: String!, setBornTo: Int!): Author 
  }
`
let curBooks = books
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
    authorCount: () => authors.length,
    bookCount: () => curBooks.length,
    allBooks: (root, args) => {
      let booksToReturn = books 
     
      let booksByAuthor = books.filter(book => book.author === args.author)
      if( booksByAuthor.length > 0){
        booksToReturn = booksByAuthor
      }else{
        booksByAuthor = booksToReturn
      }
      
      const booksByGenre = booksByAuthor.filter(book => book.genres.indexOf(args.genre) >= 0)
      if( booksByGenre.length > 0){
        booksToReturn = booksByGenre
      }
      
      return booksToReturn
    },
    allAuthors: () => {
      return authors
    }
  },
  Mutation:{
    addBook: (root, args) => {
 
      if(books.find(book =>  book.title === args.title)){
        throw new UserInputError('book already exists', {
          invalidArgs: args.title
        })
      }
      const newBook = {...args, id: uuid()}
  
      books = books.concat(newBook)
      return newBook
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      console.log("find author ", author)
      if ( author === undefined){
        return null
      }
      const updatedAuthor = {...author, name: args.name, born: args.setBornTo}
      authors = authors.map(a => a.name === updatedAuthor.name? updatedAuthor: a)
      console.log('updated ', updatedAuthor)
      return updatedAuthor
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`)
})
