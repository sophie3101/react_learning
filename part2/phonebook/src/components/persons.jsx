import React, {useState} from "react"
import Person from "./Person"
const Persons = ({persons, filter, deleteContact}) => {
    const newPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter) ||  person.number.includes(filter)
    })
    return (
        <div>
            <ul >
                {newPersons.map( (person,i)=> 
                    <Person key={i} person={person} deleteContact={deleteContact}/> 
                    )
                }
            </ul>            
        </div>
    )
}

export default Persons