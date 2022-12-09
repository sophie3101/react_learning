import React from "react"

const Person = ({person, deleteContact}) =>
 <li>
    {person.name} {person.number}
    <button onClick={()=>deleteContact(person.id)}>Delete</button>
</li>

export default Person