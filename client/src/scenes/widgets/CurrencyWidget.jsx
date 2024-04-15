import React from "react";
import CurrencyContainer from "./CurrencyContainer";
import { TbSwitch2 } from "react-icons/tb";
import { countryFlagsData } from "dataFiles/countryFlagsData";
import { allCountryData } from "dataFiles/currencyCountry";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetCloseButton from "./WidgetCloseButton";

  export default function CurrencyWidget(props)  {  
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [currencyData, setCurrenctyData] = React.useState(null);
  const [baseCurrencyAmount, setBaseCurrencyAmount] = React.useState(1);
  const [baseFlagImage, setbaseFlagImage] = React.useState(
    "https://twemoji.maxcdn.com/2/svg/1f1fa-1f1f8.svg"
  );
  const [baseCurrencyData, setBaseCurrencyData] = React.useState(null);
  const [secondaryCurrencyAmount, setSecondaryCurrencyAmount] =
    React.useState(148.2858);
  const [secondaryCurrencyData, setSecondaryCurrencyData] =
    React.useState(null);
  const [secondaryFlagImage, setSecondaryFlagImage] = React.useState(
    "https://twemoji.maxcdn.com/2/svg/1f1ef-1f1f5.svg"
  );
  const [showBaseFlagMenu, setShowBaseFlagMenu] = React.useState(false);
  const [showSecondaryFlagMenu, setShowSecondaryFlagMenu] =
    React.useState(false);

  function handleBaseCurrencyChange(event) {
    const value = event.target.value;
    setBaseCurrencyAmount(value);
  }

  function handleSecondaryCurrencyChange(event) {
    const value = event.target.value;
    setSecondaryCurrencyAmount(value);
  }

  function handleBaseFlagChange() {
    setShowBaseFlagMenu((prevShow) => !prevShow);
  }

  function handleSecondaryFlagChange() {
    setShowBaseFlagMenu((prevShow) => !prevShow);
  }

  function toggleBaseFlagMenu() {
    setShowBaseFlagMenu((prevShow) => !prevShow);
  }

  function toggleSecondaryFlagMenu() {
    setShowSecondaryFlagMenu((prevShow) => !prevShow);
  }

  function switchCurrency() {}

  return (
    <>
      <WidgetWrapper
        className="currency-container light-mode"
        style={{ display: props.showWidgets.showCurrencyWidget ? "" : "none" }}
      >
      <WidgetCloseButton
        closeWidgetFunction={props.toggleCurrencyWidget}
      ></WidgetCloseButton>
        <div className="currency-content">
          <form className="currency-form">
            <p className="currency-base-rate">
              Base Rate: 1 USD = 148.2858 JPY{" "}
            </p>
            <p className="currency-error">Current rates are unavailable</p>
            <CurrencyContainer
              className="base-currency"
              currencyAmount={baseCurrencyAmount}
              handleChange={handleBaseCurrencyChange}
              handleFlagChange={handleBaseFlagChange}
              flagImage={baseFlagImage}
              countryFlagsData={countryFlagsData}
              showMenu={showBaseFlagMenu}
              toggleFlagMenu={toggleBaseFlagMenu}
            />

            <button className="currency-switch-btn" onClick={switchCurrency}>
              <TbSwitch2 />
            </button>

            <CurrencyContainer
              className="secondary-currency"
              currencyAmount={secondaryCurrencyAmount}
              handleChange={handleSecondaryCurrencyChange}
              handleFlagChange={handleSecondaryFlagChange}
              flagImage={secondaryFlagImage}
              showMenu={showSecondaryFlagMenu}
              toggleFlagMenu={toggleSecondaryFlagMenu}
            />
          </form>
        </div>
      </WidgetWrapper>
    </>
  );
}
