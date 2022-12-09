import React from "react"
import OneCountry from "./OneCountry"
import CountryDisplay from "./CountryDisplay"

const SearchResult = ({countries}) => {
    if (countries.length >=10) {
        return <p>Too many matches, specify another filter</p>
    }else{
        if(countries.length === 1 ){
            return <OneCountry country={countries[0]}/>
        }else{
            return (
                <ul>
                    {countries.map(
                        country => <CountryDisplay key={country.name.common} country={country} />)
                    }
                </ul>
            )
        }
    }
    
}

export default SearchResult