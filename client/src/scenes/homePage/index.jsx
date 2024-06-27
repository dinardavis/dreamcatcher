import React from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import PhotosWidget from "scenes/widgets/PhotosWidget";
import CitySearchWidget from "scenes/widgets/CitySearchWidget";

import { airportData } from "../../dataFiles/airportData"
import { departureAirportData } from "../../dataFiles/departureAirportData";
import { countryCodeData } from "../../dataFiles/countryCodes";
import WeatherWidget from "scenes/widgets/WeatherWidget";
import SidebarWidget from "scenes/widgets/SidebarWidget";
import ComingSoon from "scenes/widgets/ComingSoon";
import AdvisoryWidget from "scenes/widgets/AdvisoryWidget";
import FlightsWidget from "scenes/widgets/FlightWidget";
// import GoogleMapWidget from "scenes/widgets/GoogleMapsWidget";
import CurrencyWidget from "scenes/widgets/CurrencyWidget";
import PTOTrackerWidget from "scenes/widgets/PTOTrackerWidget";
import BudgetWidget from "scenes/widgets/BudgetWidget";
import DateWidget from "scenes/widgets/DateWidget";
import TodoWidget from "scenes/widgets/TodoWidgetFiles/TodoWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";



const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  const [location, setLocation] = React.useState(
    () => JSON.parse(localStorage.getItem("searchInput")) || "tokyo"
  );
  const [searchParam, setSearchParam] = React.useState(
    () => JSON.parse(localStorage.getItem("searchInput")) || "tokyo"
  );

  const [toAirportCode, setToAirportCode] = React.useState(
    () => JSON.parse(localStorage.getItem("currentAirportCode")) || "NRT"
  );
  const [toCountryCode, setToCountryCode] = React.useState(
    () => JSON.parse(localStorage.getItem("countryCode")) || "JP"
  );
  const [fromAirportCode, setFromAirportCode] = React.useState(
    () => JSON.parse(localStorage.getItem("fromAirport")) || "SFO"
  );
  const [showWidgets, setShowWidgets] = React.useState(
    () => JSON.parse(localStorage.getItem("widgetsDisplayed")) ||{
    showFlightWidget: true,
    showMapWidget: true,
    showAdvisoryWidget: true,
    showCalendarWidget: false,
    showTodoWidget: false,
    showWeatherWidget: true,
    showCurrencyWidget: false,
    showPTOWidget: false,
    showBudgetWidget: true, 
    showFriendListWidget: true, 
    showPostsWidget: true, 
  });
  const [returnDate, setReturnDate] = React.useState(() => {
    let today = new Date()
    today.setDate(today.getDate() + 14) //Initialize returnDate to one week after departureDate
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`
  })
  const [departureDate, setDepartureDate] = React.useState(() => {
    let today = new Date()
    today.setDate(today.getDate() + 7) //Initialize departureDate to one week from today
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`
  });

  const [isVisible, setIsVisible] = React.useState(false);
  const [weatherInfo, setWeatherInfo] = React.useState({
    cityName: "",
    countryName: "",
    temp: "",
    weatherUnits: "",
    desc: "",
    feelsLike: "",
    tempMax: "",
    tempMin: "",
  })

 

  function updateWeatherInfo(weatherApiData){
    setWeatherInfo(prevWeatherInfo => {
      return {
        ...prevWeatherInfo,
        cityName: weatherApiData.name,
        countryName: weatherApiData.sys.country,
        temp: weatherApiData.main.temp,
        weatherUnits: tempUnits,
        desc: weatherApiData.weather[0].description,
        feelsLike: weatherApiData.main.feels_like,
        tempMax: weatherApiData.main.temp_max,
        tempMin: weatherApiData.main.temp_min,
      }
    })
  }



  const [tempUnits, setTempUnits] = React.useState(() => JSON.parse(localStorage.getItem("currentTempUnits")) || "imperial")

  React.useEffect(() => {
    localStorage.setItem("currentTempUnits", JSON.stringify(weatherInfo.weatherUnits))
    }, [weatherInfo.weatherUnits])


  function toggleFlightWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showFlightWidget: !prevWidgets.showFlightWidget
      }
    })
  }

  function toggleMapWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showMapWidget: !prevWidgets.showMapWidget
      }
    })
  }




  function toggleAdvisoryWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showAdvisoryWidget: !prevWidgets.showAdvisoryWidget
      }
    })
  }

  function toggleCalendarWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showCalendarWidget: !prevWidgets.showCalendarWidget
      }
    })
  }

  function toggleTodoWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showTodoWidget: !prevWidgets.showTodoWidget
      }
    })
  }

  function toggleWeatherWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showWeatherWidget: !prevWidgets.showWeatherWidget
      }
    })
  }

  function toggleCurrencyWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showCurrencyWidget: !prevWidgets.showPCurrencyWidget
      }
    })
  }

  function togglePTOWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showPTOWidget: !prevWidgets.showPTOWidget
      }
    })
  }

  function toggleBudgetWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showBudgetWidget: !prevWidgets.showBudgetWidget
      }
    })
  }

  function toggleFriendListWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showFriendListWidget: !prevWidgets.showFriendListWidget
      }
    })
  }

  function togglePostsWidget() {
    setShowWidgets(prevWidgets => {
      return {
          ...prevWidgets,
          showPostsWidget: !prevWidgets.showPostsWidget
      }
    })
  }

 
  //Local storage assignment for airport codes and location

  React.useEffect(() => {
    localStorage.setItem("searchInput", JSON.stringify(location));
  }, [location]);

  React.useEffect(() => {
    localStorage.setItem("currentAirportCode", JSON.stringify(toAirportCode));
  }, [toAirportCode]);

  React.useEffect(() => {
    localStorage.setItem("fromAirport", JSON.stringify(fromAirportCode));
  }, [fromAirportCode]);

  React.useEffect(() => {
    localStorage.setItem("countryCode", JSON.stringify(toCountryCode));
  }, [toCountryCode]);

  React.useEffect(() => {
    localStorage.setItem("widgetsDisplayed", JSON.stringify(showWidgets));
  }, [showWidgets]);

  //Filter ARRIVAL cities with multiple airports to simplify airport data
  const uniqueCityAirports = [];
  const filteredAirportData = airportData.filter((airport) => {
    const isDuplicate = uniqueCityAirports.includes(airport.city);

    if (!isDuplicate) {
      uniqueCityAirports.push(airport.city);
      return true;
    }
    return false;
  });

  const cityNames = filteredAirportData.map((airport) => {
    const cities = airport.city;
    return cities.toUpperCase();
  });

  function toggleIsVisible() {
    setIsVisible((prevVisible) => !prevVisible);
  }

  if (isVisible) {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  }

  function handleChange(event) {
    const value = event.target.value;
    setLocation(value);
  }

  function clearInput() {
    document.querySelector("#city-search-input").value = "";
  }


  function toggleUnits() {
    if(tempUnits === "imperial") {
      setTempUnits("metric")
      postCityAndTempToServer(location, "metric")
      setWeatherInfo(prevWeatherInfo => {
        return {
          ...prevWeatherInfo, 
          weatherUnits: "metric",
        }
      })
    } else {
      setTempUnits("imperial")
      postCityAndTempToServer(location, "imperial")
      setWeatherInfo(prevWeatherInfo => {
        return {
          ...prevWeatherInfo, 
          weatherUnits: "imperial",
        }
      })
    }
    getInfoFromServer()
  }

  console.log(weatherInfo)
  console.log(`city: ${location}, tempUnits: ${tempUnits}, weatherUnits: ${weatherInfo.weatherUnits}`)


  // Select airport from user input

  function getMatchingAirport() {
    const matchingAirportCode = filteredAirportData.filter((airport) => {
      const cityFromData = airport.city.toUpperCase();
      return cityFromData.includes(location.toUpperCase());
    });
    return matchingAirportCode;
  }

  function getAirportCode() {
    const airport = getMatchingAirport();
    setToAirportCode(airport[0].iata_code);
  }


  // const updateLocationData = async() => {
  //   const currentLocationData = await fetch(`https://dreamcatcher.onrender.com/location`, {
  //     method: "PATCH",
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(
  //       {
  //         "current": "Kiev"
  //       }
  //     )
  //   })
  //   console.log('working!')
  // }

  // fetch(`https://dreamcatcher.onrender.com/location`)
  // .then(res => res.json())
  // .then(data => console.log(data.current))
  // .catch((err) => {
  //   console.log(err);
  // })


  React.useEffect(() => {
    postLoadDataToServer(location, tempUnits, fromAirportCode, toAirportCode, departureDate, returnDate)
  }, [])





  const baseUrl = 'http://localhost:3001'

  async function postLoadDataToServer(citySearch, temp, from, to, departing, returning) {
    const res = await fetch(baseUrl + "/initializeData", 
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          cityAndTempParcel: {
            city: citySearch,
            temperatureUnits: temp
          },
          flightParcel: {
            fromAirport: from,
            toAirport: to,
            departureDay: departing,
            returnDay: returning
          }
        })
      }
    )
  }


  async function postCityAndTempToServer(citySearch, temp) {
    const res = await fetch(baseUrl + "/currentCityAndTemp", 
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          cityAndTempParcel: {
            city: citySearch,
            temperatureUnits: temp
          }
        })
      }
    )
  }



  async function getUpdatedTempUnits() {
    await fetch("http://localhost:3001/weather")
      .then(res => res.json())
  }

  async function getInfoFromServer() {
    await fetch("http://localhost:3001/currentCityAndTemp")
      .then(res => res.json())
  }

  function updateLocation(e) {
    e.preventDefault();
    const introCopyError = document.querySelector(".intro-copy-error");
    if (cityNames.includes(location.toUpperCase())) {
      introCopyError.style.visibility = "hidden";
      setSearchParam(location);
      getAirportCode();
      getCountryCode(airportData, "city", location);
      postCityAndTempToServer(location, weatherInfo.weatherUnits)
      getInfoFromServer()
    } else {
      introCopyError.style.visibility = "visible";
    }
    clearInput();
  }

  //Filter DEPARTURE cities with multiple airports to simplify airport data
  const uniqueDepartureCityAirports = [];
  const filteredDepartureAirportData = departureAirportData.filter(
    (airport) => {
      const departureIsDuplicate = uniqueDepartureCityAirports.includes(
        airport.city
      );

      if (!departureIsDuplicate) {
        uniqueDepartureCityAirports.push(airport.city);
        return true;
      }
      return false;
    }
  );

  //Retrieve country code from user input city

  function getCountryCode(arr, propName, propValue) {
    let cityObj = "";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][propName].toUpperCase() === propValue.toUpperCase()) {
        cityObj = arr[i];
      }
    }

    for (let i = 0; i < countryCodeData.length; i++) {
      if (
        cityObj.country.toUpperCase() ===
        countryCodeData[i]["Name"].toUpperCase()
      ) {
        setToCountryCode(countryCodeData[i]["Code"]);
      }
    }
  }

  return (
    <Box className="main-container">
      <Navbar 
        searchParam={searchParam}
      />
      <SidebarWidget
        showWidgets={showWidgets}
        toggleFlightWidget={toggleFlightWidget}
        toggleMapWidget={toggleMapWidget}
        toggleAdvisoryWidget={toggleAdvisoryWidget}
        toggleCalendarWidget={toggleCalendarWidget}
        toggleTodoWidget={toggleTodoWidget}
        toggleWeatherWidget={toggleWeatherWidget}
        toggleCurrencyWidget={toggleCurrencyWidget}
        togglePTOWidget={togglePTOWidget}
        toggleBudgetWidget={toggleBudgetWidget}
        toggleFriendListWidget={toggleFriendListWidget}
        togglePostsWidget={togglePostsWidget}
        toggleIsVisible={toggleIsVisible}
        comingSoon={<ComingSoon isVisible={isVisible} />}
      />

      <Box className="widget-display">
        {/* USER WIDGET CONTAINER */}
        <UserWidget 
          userId={_id}
          picturePath={picturePath}
        />

        <PostsWidget 
          userId={_id} 
          togglePostsWidget={togglePostsWidget}
          showWidgets={showWidgets}
        />

        {/* CITY SEARCH WIDGET CONTAINER */}
        <CitySearchWidget 
          location={location}
          handleChange={handleChange}
          updateLocation={updateLocation}
        />
    
        {/* PHOTO WIDGET CONTAINER */}
        <PhotosWidget 
          searchParam={searchParam}
        />

        {/* FRIENDLIST WIDGET CONTAINER */}
        <FriendListWidget 
          userId={_id}
          toggleFriendListWidget={toggleFriendListWidget}
          showWidgets={showWidgets}
        />

        {/* ADVERT WIDGET CONTAINER */}
        <AdvertWidget />

        {/* FLIGHT WIDGET CONTAINER */}  
        <FlightsWidget
          searchParam={searchParam}
          fromAirportCode={fromAirportCode}
          setFromAirportCode={setFromAirportCode}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          toAirportCode={toAirportCode}
          filteredAirportData={filteredAirportData}
          filteredDepartureAirportData={filteredDepartureAirportData}
          showWidgets={showWidgets}
          toggleFlightWidget={toggleFlightWidget}
        />

        {/* GOOGLE MAP WIDGET CONTAINER */}
        {/* <GoogleMapWidget
          searchParam={searchParam}
          toggleMapWidget={toggleMapWidget}  
          showWidgets={showWidgets}
        /> */}
        
        {/* CURRENCY WIDGET CONTAINER */} 
        <CurrencyWidget
          countryCode={toCountryCode}
          toggleCurrencyWidget={toggleCurrencyWidget}  
          showWidgets={showWidgets}
        />

        {/* WEATHER WIDGET CONTAINER */}
        <WeatherWidget
          searchParam={searchParam}
          toggleWeatherWidget={toggleWeatherWidget}
          showWidgets={showWidgets}
          tempUnits={tempUnits}
          setTempUnits={setTempUnits}
          weatherInfo={weatherInfo}
          updateWeatherInfo={updateWeatherInfo}
          toggleUnits={toggleUnits}
          updateLocation={updateLocation}
        />

        {/* ADVISORY WIDGET CONTAINER */}  
        <AdvisoryWidget
          searchParam={searchParam}
          countryCode={toCountryCode}
          toggleAdvisoryWidget={toggleAdvisoryWidget}
          showWidgets={showWidgets}
        />

        {/* PTO TRACKER WIDGET CONTAINER */}
        <PTOTrackerWidget 
          togglePTOWidget={togglePTOWidget}  
          showWidgets={showWidgets}
        />
            
        {/* BUDGET WIDGET CONTAINER */}
        <BudgetWidget
          searchParam={searchParam}
          showWidgets={showWidgets}
          toggleBudgetWidget={toggleBudgetWidget}
        />

        {/* DATE WIDGET CONTAINER */} 
        <DateWidget
          toggleCalendarWidget={toggleCalendarWidget}
          showWidgets={showWidgets}
        />

        {/* TODO WIDGET CONTAINER */}
        <TodoWidget 
          toggleTodoWidget={toggleTodoWidget}
          showWidgets={showWidgets}
        />
      </Box>  
    </Box>
  )
}

export default HomePage;