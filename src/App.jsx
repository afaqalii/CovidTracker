import { useState, useEffect } from 'react'
import './App.css'
import { FormControl, MenuItem, Select } from '@mui/material'

function App() {

  const [Countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  
  
  useEffect(() => {
    
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        const countries = data.map(country => ( 
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ))
        setCountries(countries)
      })
    }
    getCountriesData()
  }, [])
  
  const getCountryCode =  (e) => {
    const selectedCountry = e.target.value
    setCountry(selectedCountry)
  }

  return (
    <div className="App">    
    <div className="app__header">
      <h1>Covid Tracker</h1>
      <FormControl className='app__dropdown'>
        <Select 
          variant='outlined'
          value={country}
          onChange={getCountryCode}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {
              Countries.map(country => (
                 <MenuItem value={country.value}>{country.name}</MenuItem>    
              ))
            }
        </Select>
      </FormControl>  
    </div>
    </div>
  )
}

export default App
