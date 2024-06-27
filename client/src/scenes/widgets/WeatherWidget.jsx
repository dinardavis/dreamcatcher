import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from "./WidgetCloseButton";

// const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY

export default function WeatherWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;


  const [fetchDataError, setFetchDataError] = React.useState(false);


  React.useEffect(() => {
    fetch(`http://localhost:3001/weather`)
      .then(res => res.json())
      .then(data => props.updateWeatherInfo(data))
      .then(setFetchDataError(false))
      .catch(err => {
          console.log(err)
          setFetchDataError(true)
      })

  }, [props.searchParam, props.weatherInfo.weatherUnits])


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
     {!props.weatherInfo ? 
        <p className="loading">Loading...</p> :
        <WidgetWrapper className="weather-container light-mode widget-radius" style={{ display: props.showWidgets.showWeatherWidget ? '': 'none'}}>
          <WidgetCloseButton
            closeWidgetFunction={props.toggleWeatherWidget}
          ></WidgetCloseButton>
          <p className="weather--location">{props.weatherInfo.cityName}, {props.weatherInfo.countryName}</p>
          <div className="temp-icon-container">
            <p className="weather--temp">{Math.round(props.weatherInfo.temp)} {props.weatherInfo.weatherUnits === "imperial" ? "°F" : "°C" }</p>
            {/* <img className="weather--icon" src={`imgs/weather/${selectWeatherIcon(props.weatherInfo.weather[0].main)}`} alt={props.weatherInfo.weather[0].description} /> */}
          </div>
          <p className="weather--feels">Feels Like: {Math.round(props.weatherInfo.feelsLike)} {props.weatherInfo.weatherUnits === "imperial" ? "°F" : "°C" }</p>
          <div className="weather--desc">{props.weatherInfo.desc} </div>
        
          <div className="weather-footer">
            <div className="temp-min-max"> 
              <p className="weather--high">High: {Math.round(props.weatherInfo.tempMax)} {props.weatherInfo.weatherUnits === "imperial" ? "°F" : "°C" }</p> •
              <p className="weather--low">Low: {Math.round(props.weatherInfo.tempMin)} {props.weatherInfo.weatherUnits === "imperial" ? "°F" : "°C" }</p>
            </div>
            <div className="toggle-temp-units" onClick={props.toggleUnits}>°F / °C</div>
          </div>
        </WidgetWrapper>
      }





      {/* {!props.weatherInfo ? 
        <p className="loading">Loading...</p> :
        <WidgetWrapper className="weather-container light-mode widget-radius" style={{ display: props.showWidgets.showWeatherWidget ? '': 'none'}}>
          <WidgetCloseButton
            closeWidgetFunction={props.toggleWeatherWidget}
          ></WidgetCloseButton>
          <p className="weather--location">{props.weatherInfo.name}, {props.weatherInfo.sys.country}</p>
          <div className="temp-icon-container">
            <p className="weather--temp">{Math.round(props.weatherInfo.main.temp)} {props.tempUnits === "imperial" ? "°F" : "°C" }</p>
            <img className="weather--icon" src={`imgs/weather/${selectWeatherIcon(props.weatherInfo.weather[0].main)}`} alt={props.weatherInfo.weather[0].description} />
          </div>
          <p className="weather--feels">Feels Like: {Math.round(props.weatherInfo.main.feels_like)} {props.tempUnits === "imperial" ? "°F" : "°C" }</p>
          <div className="weather--desc">{props.weatherInfo.weather[0].main} </div>
        
          <div className="weather-footer">
            <div className="temp-min-max"> 
              <p className="weather--high">High: {Math.round(props.weatherInfo.main.temp_max)} {props.tempUnits === "imperial" ? "°F" : "°C" }</p> •
              <p className="weather--low">Low: {Math.round(props.weatherInfo.main.temp_min)} {props.tempUnits === "imperial" ? "°F" : "°C" }</p>
            </div>
            <div className="toggle-temp-units" onClick={props.toggleUnits}>°F / °C</div>
          </div>
        </WidgetWrapper>
      } */}
    </>
  )
}