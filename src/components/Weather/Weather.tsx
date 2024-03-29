import React, { useState } from "react";
import NavbarM from "../Navbar";
import WeatherForm from "./WeatherForm";
import WeatherDisplay from "./WeatherDisplay";
import axios from "axios";
import "../../css/weather.css";
export interface WeatherData {
  City: string;
  Country: string;
  Weather: string;
  WeatherDesc: string;
  Temp: number | null;
  icon: string;
  humidity: number | null;
  pressure: number | null;
  feels: number | null;
  Maxtemp: number | null;
  Mintemp: number | null;
  Windspeed: number | null;
  longitudes: number | null;
  latitudes: number | null;
}
const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    City: "",
    Country: "",
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
  const [isClicked, setIsClicked] = useState(false);

  const handleFormSubmit = async (city: string, country: string) => {
    //fetch request to fetch weather data from OpenWeather API
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_ID
        }`
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
        setWeatherData({
          City: city,
          Country: country,
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



  return (
    <>
      <NavbarM />
      <div className="container-weather">
        <h4 className="lets-find">Let's find out weather in your city</h4>
        <WeatherForm onSubmit={handleFormSubmit} />
        {isClicked && <WeatherDisplay weatherData={weatherData} />}
      </div>
    </>
  );
};

export default Weather;
