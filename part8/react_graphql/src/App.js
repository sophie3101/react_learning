import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import { ALL_PERSONS } from './queries'
import { useState } from 'react'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  // useQuery hook is well-suited for situations where the query is done when the component is rendered
  // useQuery and use the option skip, which makes it possible to do the query only if a set condition is true.
  // use pollInterval  every time a user adds a new person, it appears immediately on the screens of all users.
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000)
  }
  if( result.loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify}/>
    </div>
  )
}

const Notify = ({errorMessage}) => {
  if( !errorMessage ){return null}
  return (
    <div style={{color:'red'}}>
      {errorMessage}
    </div>
  )
}

export default App