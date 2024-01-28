import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../css/weather.css";
interface WeatherFormProps {
  onSubmit: (city: string, country: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(city, country);
  };

  return (
    <form id="form" className="form" onSubmit={handleSubmit}>
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
      <button type="submit" className="form-submit">
        Search
      </button>
    </form>
  );
};

export default WeatherForm;
