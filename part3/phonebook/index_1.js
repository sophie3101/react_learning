const { application, response, json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

var morgan = require('morgan')

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxID = persons.length > 0 ? Math.max(...persons.map(p=> p.id)) : 0
    return maxID + 1
}
app.get('/', (req, res) => {
    res.send('<h1>Exercises 3.1-3.6 </h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const peopleNum = persons.length
    const time = new Date()
    res.send(`<div> <p>Phonebook has info for ${peopleNum} people </p> <p>${time} </p></div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = persons.find(person => person.id === id)
    console.log(contact)
    // const note = notes.find(note => note.id === id)
    response.json(contact)
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.map(person => person.id !== id)
    res.status(204).end()
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.post('/api/persons/:id', (req, res) => {
    const body = req.body
    if (!body.name || !body.number){
        return res.status(400).send({error: 'unknonwn'})
    }
   
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    res.json(persons)
})
morgan.token('body', request => JSON.stringify(request.body))
app.listen(3001, () => console.log('Server running on port 3001'))