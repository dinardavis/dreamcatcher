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
      {/* <img 
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}
      /> */}
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
     
      {/* <FlexBetween>
        <Typography color={main}>DianaRiveraCosmetics</Typography>
        <Typography color={medium}>dianariveracosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning beauty!
      </Typography> */}
    </div>
  )
}

export default AdvertWidget;