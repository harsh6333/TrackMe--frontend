import React, { useState, useEffect } from "react";
import axios from "axios";
import gauge from "../../../public/images/gauge.png";
import thermometer from "../../../public/images/thermometer.png";
import humidity from "../../../public/images/humidity.png";
import wind from "../../../public/images/wind.png";
import "../../css/weather.css";
import { WeatherData } from "./Weather";

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const [datee, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timezoneResponse = await axios.get(
          `https://api.ipgeolocation.io/timezone?apiKey=${
            import.meta.env.VITE_OPENWEATHER_API_KEY
          }=${weatherData.latitudes}&long=${weatherData.longitudes}`
        );
        const time = timezoneResponse.data;
        const date = time["date_time_txt"];
        setDate(date);
      } catch (error) {
        console.error("Error fetching timezone data:", error);
      }
    };

    fetchData();
  }, [weatherData.latitudes, weatherData.longitudes]);

  return (
    <section id="cards" className="cards">
      <div className="data">
        <div className="date">
          <span>{datee}</span>
          <div className="desc">
            <img
              id="img"
              src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt=""
            />
            <span>{weatherData.WeatherDesc}</span>
          </div>
        </div>
        {/* temperatures */}
        <div className="tempcity">
          <div id="city2">
            <h2>
              {(weatherData.Temp! - 273.15).toFixed(2)}
              &deg;C
            </h2>
            <span>
              Weather Today in {weatherData.City},{weatherData.Country}
            </span>
          </div>
          <div id="tempv">
            <span>MinTemperature|MaxTemperature</span>
            <span>
              {(weatherData.Mintemp! - 273.15).toFixed(2)}
              &deg;C|
              {(weatherData.Maxtemp! - 273.15).toFixed(2)}
              &deg;C
            </span>
            <span id="feels">
              Feels Like: {(weatherData.feels! - 273.15).toFixed(2)}
              &deg;C
            </span>
          </div>
        </div>
        {/* other data:-humidity etc. */}
        <div className="data1">
          <div className="grid-i feels">
            <span>
              <img id="im" src={thermometer} alt="" />
              Feels like
            </span>
            <h2>{(weatherData.feels! - 273.15).toFixed(2)}&deg;C</h2>
          </div>
          <div className="grid-i Pressure">
            <span>
              <img id="im" src={gauge} alt="" />
              Pressure
            </span>
            <h2>{weatherData.pressure}</h2>
          </div>
          <div className="grid-i humidity">
            <span>
              <img id="im" src={humidity} alt="" />
              Humidity
            </span>
            <h2>{weatherData.humidity}</h2>
          </div>
          <div className="grid-i wind">
            <span>
              <img id="im" src={wind} alt="" />
              Wind Speed
            </span>
            <h2>{weatherData.Windspeed}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherDisplay;
