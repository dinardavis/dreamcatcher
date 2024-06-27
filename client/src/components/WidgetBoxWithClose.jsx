import React from 'react'
import { Box, Typography, Divider, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from './WidgetCloseButton';
import { nanoid } from 'nanoid';

export default function WidgetBoxWithClose(props) {
  const { palette } = useTheme();
  const dark = palette.background.alt;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

console.log()
  
  return (
    <WidgetWrapper 
      className='widget-container widget-radius' 
      style={{ display: props.showWidget ? '': 'none'}}
      id={nanoid()}
    >
      <WidgetCloseButton
        toggleWidgetVisibility={props.toggleWidgetVisibility}
      ></WidgetCloseButton>
      {props.children}
    </WidgetWrapper>
  )
}
