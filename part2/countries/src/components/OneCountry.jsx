import React from "react"
import axios from 'axios'
import { useState, useEffect} from "react"

const Weather = ({country}) => {
    const api = process.env.REACT_APP_API_KEY
    const weatherLink = "https://api.openweathermap.org/data/2.5/weather?q="+country.capital+"&appid="+api
    const [windSpeed, setWindSpeed] = useState(0)
    const [temp, setTemp] = useState(0)
    const [weatherIconLink, setWeatherIconLink] = useState('')
    useEffect(() => {
        axios.get(weatherLink)
                .then(response => { 
                    setTemp(response.data.main.temp)
                    setWindSpeed(response.data.wind.spped)

                    setWeatherIconLink("http://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png")
                    console.log(weatherIconLink)
                })
    }, [])

    return (
        <div>
            <h1>Weather in {country.capital}</h1>
            <p>temperature {temp} Farenheit</p>
            <p>
            <a href={weatherLink} ><img src={weatherLink} alt=""/></a>
                
            </p>
            <p>wind {windSpeed} m/s</p>
            
        </div>
    )
}
const OneCountry = ({country}) => {
    console.log(country)
    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>{country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.keys(country.languages)
                            .map(key => <li key={key}>{country.languages[key]}</li>)}
            </ul>
            <img src={country.flags.png} alt=""></img>
            <Weather country={country}/>
        </div>
    )
}

export default OneCountry