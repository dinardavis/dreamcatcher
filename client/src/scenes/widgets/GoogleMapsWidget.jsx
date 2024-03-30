import React from 'react';
import {APIProvider, Map, Marker,} from '@vis.gl/react-google-maps';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from './WidgetCloseButton';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '10px'
};

const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;


export default function GoogleMapWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const position = {lat: 61.2176, lng: -149.8997};

  return (
    <WidgetWrapper className="map-container light-mode widget-radius" style={{ display: props.showWidgets.showMapWidget ? '': 'none'}}>
      <WidgetCloseButton
        closeWidgetFunction={props.toggleMapWidget}
      ></WidgetCloseButton>
      <iframe src="https://storage.googleapis.com/maps-solutions-nd083rintg/neighborhood-discovery/574g/neighborhood-discovery.html"
        width="100%" 
        height="100%"
        loading="lazy">
      </iframe>
    
    </WidgetWrapper>
      
  )
}