import { useEffect, useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useMutation, useQuery } from "@apollo/client"

const BirthYearForm = (props) => {
  const authors_result = useQuery(ALL_AUTHORS)
  const [editAuthor, result] = useMutation(EDIT_AUTHOR,
    {refetchQueries: [ { query: ALL_AUTHORS}]}
  )
  useEffect(() => {
    if( result.data && result.data.editAuthor === null){
      // props.setError('author not found')
    }
  })
  const [name, setName ] = useState('')
  const [year, setYear] = useState('')
  if (authors_result.loading) {
    return <div>loading...</div>
  }
  
  const setBornTo = parseInt(year)
  const submit = event => {
    event.preventDefault()
    console.log('author ', name)
    editAuthor({variables: {name, setBornTo}})
    setName('')
    setYear('')
  }
  return (
  <div>
    <form onSubmit={submit}>
      {/* <div>
        Name <input value={name} onChange={({target}) => setName(target.value)} />
      </div> */}
      <div>
        <select onChange = {({target}) => setName(target.value)}>
          {authors_result.data.allAuthors.map( author => {
            return <option key ={author.name} value={author.name}>{author.name}</option>
          })}
        </select>
      </div>
      <div>
       Year <input value={year} onChange={({target}) => setYear(target.value)} />
      </div>    
      <button type='submit'>Update Author</button>
    </form>

  </div>)
}

export default BirthYearForm

