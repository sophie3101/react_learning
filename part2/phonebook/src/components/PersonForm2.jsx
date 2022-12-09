import React from "react"

const PersonForm = (props) => {
    return (
        <div>
          <form onSubmit={props.addContact}>
            <p>
            name: <input onChange={props.nameChange}/>
            </p>
            <p>
            number: <input onChange={props.phoneChange}/>
            </p>
            <button type="submit">Add</button>
          </form>
          
        </div>
    )
}

export default PersonForm