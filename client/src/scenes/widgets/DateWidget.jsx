import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from './WidgetCloseButton';


export default function DateWidget(props) {
  const { palette } = useTheme();
  const dark = palette.background.alt;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  
  return (
    <WidgetWrapper className='calendar-container widget-radius' style={{ display: props.showWidgets.showCalendarWidget ? '': 'none'}}>
      <WidgetCloseButton
        closeWidgetFunction={props.toggleCalendarWidget}
      ></WidgetCloseButton>
       <Calendar 
        className='calendar' 
        />
    </WidgetWrapper>
  )
}