import { Typography, useTheme } from "@mui/material";
import { Tuple } from "@reduxjs/toolkit";
import FlexBetween from "components/FlexBetween";
import advertVideo from "../../../src/assets/rimowa.mp4"
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <div className="advert-container widget-radius">
      <FlexBetween className="advert-copy">
        <Typography variant="h5" fontWeight="300">
          Sponsored
        </Typography>
        <Typography fontWeight="300">Create Ad</Typography>
      </FlexBetween>
      <a href="https://www.rimowa.com/gb/en/home" target="_blank" rel="noreferrer">
        <video 
          src={advertVideo} 
          type="video"      
          alt="advert"
          width="100%"
          height="100%" 
          style={{ display: "block", objectFit: "cover" }}
          controls
          muted
          autoPlay 
          playsInline 
          loop
        >
        </video>
      </a>
    </div>
  )
}

export default AdvertWidget;