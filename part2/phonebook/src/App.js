import {useState, useEffect } from "react"
import Filter from "./components/Filter"
import Persons from "./components/persons"
import PersonForm from "./components/PersonForm2"
import personService from "./services/personService"
import Notification from "./components/Notification"
import axios from 'axios'
function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
 
  useEffect(() => {
      personService
          .getAll()
          .then(response => {
            setPersons(response.data)
          })
  }, [])
  
  const updateContact = (event) => {
    event.preventDefault()
    const matchContact = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    if(matchContact.length > 0){
      if (matchContact[0].number === newPhoneNum){
        alert(`${newName} is already added` )
      }
      else{
        if(window.confirm(`${newName} is already added, replace old number with new one?`)){
          personService.update(matchContact[0].id,matchContact[0])
                      .then(response => {
                        const newContact = {...matchContact[0], number: newPhoneNum}
                        const newPersons = persons.map(person => person.id === newContact.id ? newContact : person)
                        setPersons(newPersons)
                        setMessage('Updead phone number for ' + newName + ', now use '+ newPhoneNum)
                        setTimeout(()=> setMessage(null), 5000)                
                      })
                      .catch(error => {
                        setErrorMessage(matchContact[0].name + ' has phone updated')
                        setTimeout(()=> setMessage(null), 5000)    
                      })
        }
      }
    
    }else{
      const newPersonOb = {
        name: newName,
        number: newPhoneNum,
      }
      // add to database
      personService.create(newPersonOb)
                    .then(response => {
                      setPersons(persons.concat(newPersonOb))
                      setMessage('Added ' + newName)
                      setTimeout(()=> setMessage(null), 5000)
                    })
      
    }
  }

  
  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase()
    setFilter(filterValue)
  }

  const deleteContact= (personID) => {
      const personObj = persons.find(person => person.id === personID)
       console.log('delete id ', personID)
      axios.delete(`http://localhost:3001/persons/${personID}`, personObj)
              .then(response => {
                        console.log('Delete ', personObj.name)
                        console.log(response.data)
                        setPersons(persons.filter(person => person.id !== personID))
                        setMessage(personObj.name + ' was deleted')
                        setTimeout(()=>setMessage(null), 5000)
                })
              .catch(error => {                   
                        setErrorMessage(personObj.name + 'was removed!')
                        setTimeout(()=>setErrorMessage(null), 5000)
                    })
  }
  
  return (
    <div className="App">
      <h2> Phonebook</h2>
      filter shown with <Filter handleFilter={handleFilter} />
      <h2> add a new</h2>
        <Notification classStyle='success' message={message}/>
        <Notification classStyle='error' message={errorMessage} />
        <PersonForm 
          addContact={(e)=>updateContact(e)}
          nameChange={(event) => setNewName(event.target.value)} 
          phoneChange={(event) => setNewPhoneNum(event.target.value)}
        />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteContact={deleteContact}/>
    </div>
  );
}

export default App;
