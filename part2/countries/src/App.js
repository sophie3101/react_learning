import SearchResult from "./components/SearchResult"
import axios from 'axios'
import {useState, useEffect} from "react"
function App() {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(
      response => {
        setCountries(response.data)
      }
    )
  }, [])

  const handleFilter = (event) => {
    console.log(event.target.value)
    const searchValue = event.target.value.toLowerCase()
    const filterCountries = countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchValue) 
        || country.name.official.toLowerCase().includes(searchValue)
    })
    setFilterCountries(filterCountries)
  }
  
  return (
    <div className="App">
        find countries: <input onChange={handleFilter}/>
        <SearchResult countries={filterCountries} />
    </div>
  );
}

export default App;
