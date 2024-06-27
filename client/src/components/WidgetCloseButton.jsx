import React from "react";

export default function WidgetCloseButton(props) {


  return (
    <div id="widget-close-btn-container" 
      onClick={props.toggleWidgetVisibility}
    >
      <div className="widget-close-btn-content">X</div>
    </div>
  )
}