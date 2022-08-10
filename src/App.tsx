import React, { useState, useEffect } from 'react'
import { GlobalStyle } from './Styles/globalStyles'
import axios from 'axios'

interface cityWeatherProps {
  city: string
  feelsLike: number
  humidity: number
  temp: number
  tempMax: number
  tempMin: number
  mainWeather: string
  description: string
  icon: string
  country: string
  wind: number
}

function App() {
  const [location, setLocation] = useState('')
  const [searchLocation, setSearchLocation] = useState<cityWeatherProps>()
  const [loading, setLoading] = useState(false)

  const apiKey = '8cc52cce77b83de5cc18604711baf5fd'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

  function getGeoLocationTest() {
    if ('geolocation' in navigator) {
      console.log('Available')
    } else {
      console.log('Not Available')
    }
  }

  useEffect(() => {
    getGeoLocationTest()
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=lisbon&appid=${apiKey}&units=metric`
      )
      .then(res => {
        let dataResponse = res.data
        let cityWeather = {
          city: dataResponse.name,
          feelsLike: Math.round(dataResponse.main.feels_like),
          humidity: dataResponse.main.humidity,
          temp: Math.round(dataResponse.main.temp),
          tempMax: Math.round(dataResponse.main.temp_max),
          tempMin: Math.round(dataResponse.main.temp_min),
          mainWeather: dataResponse.weather[0].main,
          description: dataResponse.weather[0].description,
          icon: dataResponse.weather[0].icon,
          country: dataResponse.sys.country,
          wind: dataResponse.wind.speed
        }
        setSearchLocation(cityWeather)
      })
  }, [])

  async function getCityWeather(event: React.KeyboardEvent) {
    if (event?.key === 'Enter') {
      try {
        await axios.get(url).then(res => {
          let dataResponse = res.data
          let cityWeather = {
            city: dataResponse.name,
            feelsLike: Math.round(dataResponse.main.feels_like),
            humidity: dataResponse.main.humidity,
            temp: Math.round(dataResponse.main.temp),
            tempMax: Math.round(dataResponse.main.temp_max),
            tempMin: Math.round(dataResponse.main.temp_min),
            mainWeather: dataResponse.weather[0].main,
            description: dataResponse.weather[0].description,
            icon: dataResponse.weather[0].icon,
            country: dataResponse.sys.country,
            wind: dataResponse.wind.speed
          }
          setSearchLocation(cityWeather)
          setLocation('')
        })
      } catch (err) {
        alert('Unknown city, try just like example: London, GB')
        setLocation('')
      }
    }
  }

  return (
    <div
      className={'app' + ' ' + searchLocation?.description.replaceAll(' ', '_')}
    >
      <GlobalStyle />
      <div className="container">
        <div className="top">
          <div className="search">
            <input
              value={location}
              type="text"
              onChange={({ currentTarget }) => setLocation(currentTarget.value)}
              placeholder="Search, ex: London, GB"
              onKeyPress={getCityWeather}
            ></input>
          </div>
          <div className="location">
            {searchLocation?.city}, {searchLocation?.country}
          </div>
          <div className="temp">
            <h1>{searchLocation?.temp}°C</h1>
          </div>
          <div className="description">{searchLocation?.description}</div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{searchLocation?.feelsLike}°C</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">{searchLocation?.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">{searchLocation?.wind} m/s</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
