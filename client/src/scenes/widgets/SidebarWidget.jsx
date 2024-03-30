import React from "react";
import { SlPlane } from "react-icons/sl"
import { BsCalendarWeek } from "react-icons/bs"
import { BsCloudSun } from "react-icons/bs"
import { BsPinMap } from "react-icons/bs"
import { AiOutlineAlert } from "react-icons/ai"
import { BsPiggyBank } from "react-icons/bs"
import { BsCamera } from "react-icons/bs";
import { BsClock } from "react-icons/bs"
import { BsCurrencyExchange } from "react-icons/bs"
import { IoPeopleOutline } from "react-icons/io5";
import { VscChecklist } from "react-icons/vsc"
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

/* SIDEBAR CONTAINING FUTURE PLANNED FUNCTIONALITY FOR DASHBOARD */

export default function SidebarWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper 
    className="sidebar-container sidebar-reset-styles">
       <Typography className="sidebar-header" variant="h6"
        color={dark}
        fontWeight="500">Widget</Typography>
      <Box className="widgets-container">
   

        <div className="widgets widget-flight" style={{ display: props.showWidgets.showFlightWidget ? 'none': 'flex'}}>
          <SlPlane className="widget-icon flight" />
          <Typography className="widget-text">Flight<br/>Search</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleFlightWidget}
          >+</div>
        </div>

        <div className="widgets widget-friend" style={{ display: props.showWidgets.showFriendListWidget ? 'none': ''}}>
          <IoPeopleOutline className="widget-icon friend" />
          <Typography className="widget-text">Friends</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleFriendListWidget}
          >+</div>
        </div>

        <div className="widgets widget-budget" style={{ display: props.showWidgets.showBudgetWidget ? 'none': ''}}>
          <BsPiggyBank className="widget-icon budget" />
          <Typography className="widget-text">Budget</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleBudgetWidget}
          >+</div>
        </div>

        <div className="widgets widget-posts" style={{ display: props.showWidgets.showPostsWidget ? 'none': 'flex'}}>
          <BsCamera className="widget-icon camera"/>
          <Typography className="widget-text"> Posts</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.togglePostsWidget}
          >+</div>
        </div>

        <div className="widgets widget-weather" style={{ display: props.showWidgets.showWeatherWidget ? 'none': 'flex'}}>
          <BsCloudSun className="widget-icon weather" />
          <Typography className="widget-text">Weather</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleWeatherWidget}
          >+</div>
        </div>

        <div className="widgets widget-map" style={{ display: props.showWidgets.showMapWidget ? 'none': ''}}>
          <BsPinMap className="widget-icon" />
          <p className="widget-text">Map</p>
          <div 
            className="widget-add-btn"
            onClick={props.toggleMapWidget}
          >+</div>
        </div>


        <div className="widgets widget-advisory" style={{ display: props.showWidgets.showAdvisoryWidget ? 'none': ''}}>
          <AiOutlineAlert className="widget-icon advisory" />
          <Typography className="widget-text">Travel Advisories</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleAdvisoryWidget}
          >+</div>
        </div>
        
        <div className="widgets widget-todo" style={{ display: props.showWidgets.showTodoWidget ? 'none': ''}}>
          <VscChecklist className="widget-icon todo" />
          <Typography className="widget-text">Checklist</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleTodoWidget}
          >+</div>
        </div>

        <div className="widgets widget-calendar" style={{ display: props.showWidgets.showCalendarWidget ? 'none': ''}}>
          <BsCalendarWeek className="widget-icon calendar" />
          <Typography className="widget-text">Calendar</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleCalendarWidget}
          >+</div>
        </div>

        <div className="widgets widget-pto"  style={{ display: props.showWidgets.showPTOWidget ? 'hidden': ''}}>
          <BsClock className="widget-icon pto" />
          <Typography className="widget-text">PTO Tracker</Typography>
          <div 
            className="widget-add-btn"
            onClick={props.toggleIsVisible}
          >+</div>
        </div>

        <div className="widgets widget-currency" style={{ display: props.showWidgets.showCurrencyWidget ? 'hidden': ''}}>
          <BsCurrencyExchange className="widget-icon currency" />
          <Typography className="widget-text">Currency Converter</Typography>
          <div 
             className="widget-add-btn"
            onClick={props.toggleIsVisible}
          >+</div>
        </div>
      </Box>

      {props.comingSoon}
    </WidgetWrapper>
  )
}