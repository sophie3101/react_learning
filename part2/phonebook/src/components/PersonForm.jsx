import React from "react"

const PersonForm = (props) => {
    return (
        <div>
          <p>
          name: <input onChange={props.nameChange}/>
          </p>
          <p>
          number: <input onChange={props.phoneChange}/>
          </p>
          
          <button type="submit">Add</button>
        </div>
    )
}

export default PersonForm