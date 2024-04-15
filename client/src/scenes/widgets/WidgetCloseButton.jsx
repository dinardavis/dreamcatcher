import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

export default function WidgetCloseButton(props) {


  return (
    <WidgetWrapper id="widget-close-btn-container" 
      onClick={props.closeWidgetFunction}
    >
      <div className="widget-close-btn-content">X</div>
    </WidgetWrapper>
  )
}