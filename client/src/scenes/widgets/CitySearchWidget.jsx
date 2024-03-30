import React from "react";
import { Box, Typography, Divider, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

export default function CitySearchWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper className="section intro-container light-mode widget-radius">
      <p className="intro-copy">
        Enter the city's name that you've always <br></br>wished to travel to!
      </p>
      <p className="intro-copy-error">
        Sorry, we don't have info for that city. Please try again. 
      </p>
      <form className="city-search-form">
        <InputBase
          type="text"
          name="citySearch"
          placeholder="Where to?"
          id="city-search-input"
          value={props.location.userInput}
          onChange={props.handleChange}
        />
        <button
          className="search-btn" 
          onClick={props.updateLocation}
        >
        Let's Go!
        </button>
      </form>
    </WidgetWrapper>
  )
}