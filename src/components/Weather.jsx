import React, { useState } from "react";
import NavbarMenu from "./Navbar";
import gauge from "../../public/images/gauge.png";
import thermometer from "../../public/images/thermometer.png";
import humidity from "../../public/images/humidity.png";
import wind from "../../public/images/wind.png";
import "../assets/css/Weather.css";
import axios from "axios";
const Weather = () => {
  const [IsWeatherdata, setIsWeatherdata] = useState({
    City: "",
    Country: "",
    date: "",
    Weather: "",
    WeatherDesc: "",
    Temp: null,
    icon: "",
    humidity: null,
    pressure: null,
    feels: null,
    Maxtemp: null,
    Mintemp: null,
    Windspeed: null,
    longitudes: null,
    latitudes: null,
  });
  const [city, setCity] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const response = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=7835a0b878522244bfed352d88fa37eb`
      )
      .then(async (resp) => {
        const result = resp.data;
        const weather = result["weather"][0]["main"];
        const weatherdesc = result["weather"][0]["description"];
        const temperature = result["main"]["temp"];
        const mintemperature = result["main"]["temp_min"];
        const maxtemperature = result["main"]["temp_max"];
        const windspeed = result["wind"]["speed"];
        const longitudes = result["coord"]["lon"];
        const latitudes = result["coord"]["lat"];
        const feels_like = result["main"]["feels_like"];
        const humidity = result["main"]["humidity"];
        const pressure = result["main"]["pressure"];
        const icon = result["weather"][0]["icon"];
        const timezone = await axios.get(
          `https://api.ipgeolocation.io/timezone?apiKey=02346f41df984fafad4633a50294fc65&lat=${latitudes}&long=${longitudes}`
        );
        const time = timezone.data;
        const date = time["date_time_txt"];
        setDate(date);
        setIsWeatherdata({
          City: city,
          Country: country,
          date: date,
          Weather: weather,
          WeatherDesc: weatherdesc,
          Temp: temperature,
          icon: icon,
          humidity: humidity,
          pressure: pressure,
          feels: feels_like,
          Maxtemp: maxtemperature,
          Mintemp: mintemperature,
          Windspeed: windspeed,
          longitudes: longitudes,
          latitudes: latitudes,
        });
      });
    setIsClicked(true);
  };
  const Formsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <NavbarMenu />
      <div className="container-weather">
        <h4 className="lets-find">Let's find out weather in you city</h4>
        <form id="form" className="form" onSubmit={Formsubmit}>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="City"
            value={city}
            required
            onChange={handleCityChange}
          />
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Country"
            value={country}
            required
            onChange={handleCountryChange}
          />

          <button type="submit" className="form-submit" onClick={response}>
            Search
          </button>
        </form>
        <section id="cards" className={isClicked ? "cards" : "hidden"}>
          <div className="data">
            <div className="date">
              <span>{date}</span>
              <div className="desc">
                <img
                  id="img"
                  src={`http://openweathermap.org/img/wn/${IsWeatherdata.icon}.png`}
                  alt=""
                />
                <span>{IsWeatherdata.WeatherDesc}</span>
              </div>
            </div>
            <div className="tempcity">
              <div id="city2">
                <h2>
                  {(parseInt(IsWeatherdata.Temp) - 273.15).toFixed(2)}&deg;C
                </h2>
                <span>
                  Weather Today in {IsWeatherdata.City},{IsWeatherdata.Country}
                </span>
              </div>
              <div id="tempv">
                <span>MinTemperature|MaxTemperature</span>
                <span>
                  {(parseInt(IsWeatherdata.Mintemp) - 273.15).toFixed(2)}&deg;C|
                  {(parseInt(IsWeatherdata.Maxtemp) - 273.15).toFixed(2)}&deg;C
                </span>
                <span id="feels">
                  Feels Like:{" "}
                  {(parseInt(IsWeatherdata.feels) - 273.15).toFixed(2)}
                  &deg;C
                </span>
              </div>
            </div>
            <div className="data1">
              <div className="grid-i feels">
                <span>
                  <img id="im" src={thermometer} alt="" />
                  Feels like
                </span>
                <h2>
                  {(parseInt(IsWeatherdata.feels) - 273.15).toFixed(2)}&deg;C
                </h2>
              </div>
              <div className="grid-i Pressure">
                <span>
                  <img id="im" src={gauge} alt="" />
                  Pressure
                </span>
                <h2>{IsWeatherdata.pressure}</h2>
              </div>
              <div className="grid-i humidity">
                <span>
                  <img id="im" src={humidity} alt="" />
                  Humidity
                </span>
                <h2>{IsWeatherdata.humidity}</h2>
              </div>
              <div className="grid-i wind">
                <span>
                  <img id="im" src={wind} alt="" />
                  Wind Speed
                </span>
                <h2>{IsWeatherdata.Windspeed}</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Weather;
