import React, {useState} from "react"
import OneCountry from "./OneCountry"

const CountryDisplay = ({country}) => {
    const [display, setDisplay] = useState(false)

    return (
        <li>
            {country.name.common} 
            <button onClick={()=>setDisplay(!display)}>Show</button>
            {display && <OneCountry country={country}/>}
        </li>
    )
}

export default CountryDisplay