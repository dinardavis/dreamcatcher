import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import WidgetBoxWithClose from 'components/WidgetBoxWithClose';



export default function CalendarWidget(props) {



  return (
  <WidgetBoxWithClose 
    showWidget={props.showWidgets.showCalendarWidget}
    toggleWidgetVisibility={props.toggleWidgetVisibility}
  >
    <Calendar className='calendar' />
  </WidgetBoxWithClose>
  )
}