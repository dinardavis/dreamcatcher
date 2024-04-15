import React from "react";
import { allCountryData } from "dataFiles/currencyCountry";

export default function CurrencyDropdown(props) {

  
  const [countryData, setFlagData] = React.useState(allCountryData);
  const [menuOpen, setMenuOpen] = React.useState(false);

  function openMenu(id) {
    setMenuOpen((prevMenu) => !prevMenu);
    console.log(menuOpen);
  }

  return (
    <div className={`widget-radius country-currency-container ${props.class}`}>
      <div className="country-currency-content">
        <div className="currency-flag" onClick={props.toggleFlagMenu}>
          {/* <div className="current-currency-container">
            <img className="" src={props.flagImage} alt="" />
            <p className="currency-name">US Dollar<br/><span>Click flag to change</span></p>
          </div> */}
          {countryData ? (
            <div
              className="currency-flag-menu"
              style={{ height: menuOpen ? "180px" : "60px" }}
            >
              {countryData.map((country) => {
                return (
                  <div
                    className="flag-menu-info"
                    key={country.id}
                    onClick={() => openMenu(country.id)}
                  >
                    <img src={country.flag} alt={`Flag of ${country.name}`} />
                    <p className="currency-menu-name">{country.name}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <input
          type="number"
          className="search-input"
          value={props.currencyAmount}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}
