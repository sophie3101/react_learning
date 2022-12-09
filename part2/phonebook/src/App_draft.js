import {useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService  from "./services/personService"
import PersonToShow from "./components/PersonToShow"
function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [filter, setFilter] = useState('')
 
  useEffect(() => {
      personService
          .getAll()
          .then(response => {
            setPersons(response.data)
          })
  }, [])
  
  const handleAdd = (event) => {
    event.preventDefault()
    if(persons.some(p=> p.name.toLowerCase() === newName.toLowerCase())){
      alert(`${newName} is already added` )
    }else{
      const newPersonOb = {
        name: newName,
        number: newPhoneNum
      }
      // add to database
      personService.create(newPersonOb)
            .then(response => {
              setPersons(persons.concat(newPersonOb))
            })
    }
  }

  
  const handleFilter = (event) => {
    const filterValue = event.target.value.toLowerCase()
    setFilter(filterValue)
  }

  const deleteAContact = () => {
    console.log('delete')
  }
  return (
    <div className="App">
      <h2> Phonebook</h2>
      filter shown with <Filter handleFilter={handleFilter} />
      <h2> add a new</h2>
      <form onSubmit={handleAdd}>
        <PersonForm nameChange={(event) => setNewName(event.target.value)} 
          phoneChange={(event) => setNewPhoneNum(event.target.value)}/>
      </form>
      <h2>Numbers</h2>
      <PersonToShow persons={persons} filter={filter} />
    </div>
  );
}

export default App;
