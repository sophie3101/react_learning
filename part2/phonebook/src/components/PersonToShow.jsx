import React  from "react"
import Person from "./Person"
import axios from "axios"
const PersonToShow = ({persons, filter}) => {
    
    const deletePerson = (personID) => {
        console.log('delete person ', personID);
        
        // get the object that match person id
        const personObj = persons.filter(person => person.id === personID)
        const personName = personObj.name
        console.log(personName)
        alert(`Delete ${personName}?`)
        axios.delete(`http://localhost:3001/persons/${personID}`, personObj)
                    .then(response => {
                        
                    })
                    .catch(error => {
                       
                        console.error( error);
                    });
                        
    }
    if (filter.length === 0){
        return (
        <div>
            <ul>
            {persons.map(person=> <Person  key={person.id} name={person.name} number={person.number} onClick={() => deletePerson(person.id)}/>)}
            </ul>
        </div>
        )
    }else{
        const filteredPersons = persons.filter(person => {
              return person.name.toLowerCase().includes(filter) ||  person.number.includes(filter)
            })
        return (
            <div>
                <ul>
                {filteredPersons.map(person => <Person  key={person.id} name={person.name} number={person.number} onClick={() => deletePerson(person.id)}/>)}
                </ul>
            </div>
        )
    }
}

export default PersonToShow