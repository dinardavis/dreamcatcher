import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from "./WidgetCloseButton";

export default function FlightsWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [flightPrice, setFlightPrice] = React.useState(599.99);
  const [fetchDataError, setFetchDataError] = React.useState(false);
  const [departureCity, setDepartureCity] = React.useState(() => JSON.parse(localStorage.getItem("departFrom")) || "San Francisco")
 





// SORT IMPORTED AIRPORT ARRIVAL DATA BY CITY AND COUNTRY

const departureCitySort = props.filteredDepartureAirportData.sort(function(a, b) {
    let departureCityA = a.city.toUpperCase();
    let departureCityB = b.city.toUpperCase();
    return (departureCityA < departureCityB) ? -1 : (departureCityA > departureCityB) ? 1 : 0;
});

  const departureCountrySort = departureCitySort.sort(function(a, b) {
    let departureCountryA = a.country.toUpperCase();
    let departureCountryB = b.country.toUpperCase();
    return (departureCountryA < departureCountryB) ? -1 : (departureCountryA > departureCountryB) ? 1 : 0;
});

function getDepartureCity() {
  const departureCityInput = document.querySelector('.city-input')
  props.setFromAirportCode(departureCityInput.value)
  const matchingCityName = props.filteredDepartureAirportData.filter(airport => {
    const cityFromData = airport.iata_code
    return cityFromData.includes(departureCityInput.value)
  })
  setDepartureCity(matchingCityName[0].city)
  postFlightDataToServer(props.fromAirportCode, props.toAirportCode, props.departureDate, props.returnDate)
  getFlightInfoFromServer()
}

function getDepartureDate(e) {
  let flightDateError = document.querySelector(".flight-date-error")
  if(e.target.value > props.returnDate) {
    flightDateError.innerText = "Departure date cannot be after return date"
  } else {
    flightDateError.innerText = ""
    props.setDepartureDate(e.target.value)
    postFlightDataToServer(props.fromAirportCode, props.toAirportCode, props.departureDate, props.returnDate)
    getFlightInfoFromServer()
  }
}

React.useEffect(() => {
    localStorage.setItem("departFrom", JSON.stringify(departureCity))
  }, [departureCity])

function getReturnDate(e) {
  let flightDateError = document.querySelector(".flight-date-error")
  if(e.target.value < props.departureDate) {
    flightDateError.innerText = "Return date cannot be prior to departure date"
  } else {
    flightDateError.innerText = ""
    props.setReturnDate(e.target.value)
    postFlightDataToServer(props.fromAirportCode, props.toAirportCode, props.departureDate, props.returnDate)
    getFlightInfoFromServer()
  }
}

const baseUrl = 'http://localhost:3001'

async function postFlightDataToServer(from, to, departing, returning) {
  const res = await fetch(baseUrl + "/flightinfo", 
    {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
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

async function getFlightInfoFromServer() {
  await fetch("http://localhost:3001/flightinfo")
    .then(res => res.json())
    .then(data => console.log(data))
}

  // React.useEffect(() => {
  //   fetch(`http://localhost:3001/flight`)
  //   .then(res => res.json())
  //   .then(data => setFlightPrice(data.data[0].price.amount.toFixed(2) || 599.99))
  //     .then(setFetchDataError(false))
  //   .catch(err => {
  //       console.log(err)
  //       setFetchDataError(true)
  //    });
  // }, [props.searchParam, props.toAirportCode, props.fromAirportCode, props.returnDate, props.departureDate])

  return (
    <WidgetWrapper className="flight-container light-mode widget-radius" style={{ display: props.showWidgets.showFlightWidget ? '': 'none'}}>
      <WidgetCloseButton
        closeWidgetFunction={props.toggleFlightWidget}
      ></WidgetCloseButton>
      <form className="flight-form" >
        <div className="city-container">
            <div className="city-input-container">   
              <label htmlFor="departure-city" className="city-label">From:
                <select
                  name="from-city"
                  id="departure-city"
                  className="city-input"
                  value={props.fromAirportCode}
                  onChange={getDepartureCity}
                >
                {departureCountrySort.map(data => {
                  return <option className="from-input"
                            key={data.objectID}
                            value={data.iata_code}
                          >
                            {`${data.iata_code}  - ${data.city}, ${data.country}
                            `}
                          </option>
                })} 
                </select>
              </label>
          </div>
          <div className="date-container">
            <label className="date-label">Depart On:       
              <input 
                type="date" 
                className="datepicker-input depart-picker"
                value={props.departureDate}
                onChange={getDepartureDate}
              >
              </input>
            </label>
          </div>
        </div>
        
        <div className="city-container">
          <label className="city-label">To:
            <input 
              className="city-input"
              value={props.toAirportCode}
              readOnly
            />
          </label>
          
          <div className="date-container">
            <label className="date-label">Return On:       
              <input 
                type="date" 
                className="datepicker-input return-picker"
                value={props.returnDate}
                onChange={getReturnDate}
              >
              </input>
            </label>
          </div>
        </div>
      </form>

      <div className="flight-date-error error-message"></div>
      {fetchDataError && <div className="flight-data-error error-message">Error retrieving flight price. Please modify your search and try again.</div>}

      <div className="flight-cta">
        <div className="flight--price">
          <p className="flight--copy">{`Flight from ${departureCity}`}<br></br> to <span className="flight-to-city">{props.searchParam}</span> starting at: </p>
          <p className="price-display">{`$${flightPrice}`}</p>
        </div>

        <a href="https://www.kayak.com/flights" className="flight-btn" to="route" target="_blank" rel="noopener noreferrer">Go Book It!</a>
      </div>
    </WidgetWrapper>
  )
}