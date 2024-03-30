import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from "./WidgetCloseButton";

const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

export default function WeatherWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [weatherInfo, setWeatherInfo] = React.useState(null)
  const [tempUnits, setTempUnits] = React.useState(JSON.parse(localStorage.getItem("currentTempUnits")) || "imperial")
  const [fetchDataError, setFetchDataError] = React.useState(false);


  React.useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.searchParam}&units=${tempUnits}&appid=${WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => setWeatherInfo(data))
      .then(setFetchDataError(false))
      .catch(err => {
          console.log(err)
          setFetchDataError(true)
      })
  }, [props.searchParam, tempUnits])

  // Save chosen units to localStorage

  React.useEffect(() => {
    localStorage.setItem("currentTempUnits", JSON.stringify(tempUnits))
  }, [tempUnits])

  function toggleUnits() {
    if(tempUnits === "imperial") {
      return setTempUnits("metric")
    } else {
      return setTempUnits("imperial")
    }
  }

  // Set corresponding weather icon image based on fetched data
  
  const selectWeatherIcon = (data) => {
      let weatherIcon = ""
      if(data === "Clouds") {
        weatherIcon = "clouds.png";
      } else if(data === "Drizzle" || data === "Rain") {
        weatherIcon = "rain.png";
      } else if(data === "Haze") {
        weatherIcon = "haze.png";
      } else if(data === "Thunderstorm") {
        weatherIcon = "lightening.png";
      } else if(data === "Snow") {
        weatherIcon = "snow.png";
      } else if(data === "Mist" || data === "Fog") {
        weatherIcon = "fog.png";
      } else if(data === "Smoke" || data === "Dust" || data === "Sand" || data === "Ash" || data === "Squall") {
        weatherIcon = "wind.png";
      } else if(data === "Tornado") {
        weatherIcon = "tornado.png"
      } else {
        weatherIcon = "sun.png";
      }
      return weatherIcon
  }

  return (
    <>
      {!weatherInfo ? 
        <p className="loading">Loading...</p> :
        <WidgetWrapper className="weather-container light-mode widget-radius" style={{ display: props.showWidgets.showWeatherWidget ? '': 'none'}}>
          <WidgetCloseButton
            closeWidgetFunction={props.toggleWeatherWidget}
          ></WidgetCloseButton>
          <p className="weather--location">{weatherInfo.name}, {weatherInfo.sys.country}</p>
          <div className="temp-icon-container">
            <p className="weather--temp">{Math.round(weatherInfo.main.temp)} {tempUnits === "imperial" ? "°F" : "°C" }</p>
            <img className="weather--icon" src={`imgs/weather/${selectWeatherIcon(weatherInfo.weather[0].main)}`} alt={weatherInfo.weather[0].description} />
          </div>
          <p className="weather--feels">Feels Like: {Math.round(weatherInfo.main.feels_like)} {tempUnits === "imperial" ? "°F" : "°C" }</p>
          <div className="weather--desc">{weatherInfo.weather[0].main} </div>
      
          {/* {fetchDataError && <div className="error-message">There was a problem retrieving the weather for that location</div>} */}
        
          <div className="weather-footer">
            <div className="temp-min-max"> 
              <p className="weather--high">High: {Math.round(weatherInfo.main.temp_max)} {tempUnits === "imperial" ? "°F" : "°C" }</p> •
              <p className="weather--low">Low: {Math.round(weatherInfo.main.temp_min)} {tempUnits === "imperial" ? "°F" : "°C" }</p>
            </div>
            <div className="toggle-temp-units" onClick={toggleUnits}>°F / °C</div>
          </div>
        </WidgetWrapper>
      }
    </>
  )
}