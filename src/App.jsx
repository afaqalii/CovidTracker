import { useState, useEffect } from 'react'
import './App.css'
import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material'
import InfoBox from './components/InfoBox'
import Table from './components/Table'
import { sortData } from './utils'
import LineGraph from './components/LineGraph'
import Map from './components/Map'
import "leaflet/dist/leaflet.css"

function App() {

  const [Countries, setCountries] = useState([])
  const [CountryInfo, setCountryInfo] = useState({})
  const [country, setCountry] = useState("worldwide")
  const [TableData, setTableData ] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  
  useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all")
   .then(response => response.json())
   .then(data => {
    setCountryInfo(data)
   })
  },[])

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
        const sortedData = sortData(data)
        setCountries(countries)
        setTableData(sortedData)
      })
    }
    getCountriesData()
  }, [])
  
  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)
    const url = countryCode === 'worldwide'
                ? `https://disease.sh/v3/covid-19/all`
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
    })                
  }

  return (
    <div className="app">    
    <div className="app__left">
    <div className="app__header">
      <h1>Covid Tracker</h1>
      <FormControl className='app__dropdown'>
        <Select 
          variant='outlined'
          value={country}
          onChange={onCountryChange}>
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {
              Countries.map(country => (
                 <MenuItem value={country.value}>{country.name}</MenuItem>    
              ))
            }
        </Select>
      </FormControl>  
    </div>
    <div className="app__stats">
      <InfoBox 
          title='Coronavirus Cases' 
          total={CountryInfo.cases} 
          cases={CountryInfo.todayCases}
      />
      <InfoBox 
          title='Recovered' 
          total={CountryInfo.recovered} 
          cases={CountryInfo.todayRecovered}
      />
      <InfoBox 
          title='Deaths' 
          total={CountryInfo.deaths} 
          cases={CountryInfo.todayDeaths}
      />
    </div>
    {/* <Map 
      center={mapCenter}
      zoom={mapZoom}
    /> */}
    </div>
    <Card className="app__right">
        <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={TableData}/>
            <h3>WorldWide new cases</h3>
            <LineGraph/>
        </CardContent>
    </Card>
    </div>
  )
}

export default App
