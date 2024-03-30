import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from "./WidgetCloseButton";

export default function PTOTrackerWidget(props) {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [ptoGoalReached, setPtoGoalReached] = React.useState(false)


ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['c', 'Blue'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 8],
      backgroundColor: [
        'rgba(147, 235, 251, 0.4)',
        'rgba(230, 171, 62, 0.4)',
      ],
      borderColor: [
        'rgba(147, 235, 251)',
        'rgba(230, 171, 62)',
      ],
      borderWidth: 1,
    },
  ],
};


  function addPTO() {

  }

  return (
    <>
    {!data ? 
    <p className="loading">Loading...</p> :
    <WidgetWrapper className="currency-container light-mode widget-radius" style={{ display: props.showPTOWidget ? '': 'none'}}>
      <WidgetCloseButton
        closeWidgetFunction={props.togglePTOWidget}
      ></WidgetCloseButton>
      <div className="currency-content">
        <form className="currency-form">
          <p className='currency-base-rate'>Base Rate: 1 USD = 148.2858 JPY </p>
          <p className='currency-error'>Current rates are unavailable</p>
        
           
          <button
            className="update-pto-btn"
            onClick={addPTO}
          >
          Update PTO
          </button>

          <Doughnut data={data} />

        
        </form>
      </div>
    </WidgetWrapper>
    }
</>
  )
}