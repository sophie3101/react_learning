import { useQuery } from '@apollo/client'
import{ FIND_PERSON} from '../queries'
import { useState } from 'react'

const Person = ({person, onClose}) => {
  return (<div>
    <h2>{person.name}</h2>
    <div>
      {person.address.city} {person.address.street}
    </div>
    <div>
      {person.phone}
    </div>
    <button onClick={onClose}>close</button>
  </div>)
}

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: {nameToSearch},
    skip: !nameToSearch
  })
  if( nameToSearch && result.data) {
    return (<Person person = {result.data.findPerson}
            onClose={() => setNameToSearch(null)}/>
            )
  }
  return (
    <div>
    <h2>Persons</h2>
    {persons.map((p) => (
      <div key={p.name}>
        {p.name} {p.phone}
        <button onClick={() => setNameToSearch(p.name)}>show address</button>
      </div>
    ))}
  </div>
  )
}

export default Persons