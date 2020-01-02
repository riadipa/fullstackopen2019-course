import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = props => {
  return (
    <>
      <h1>{props.country.name} </h1> <br />
      capital {props.country.capital} <br />
      population {props.country.population} <br />
      <h2>languages</h2>
      <Languages languages={props.country.languages} />
      <br />
      <img src={props.country.flag} alt="flag" height="100" />
      <h2>Weather in {props.country.capital}</h2>
      <Weather city={props.country.capital} />
    </>
  );
};

const Languages = props => {
  return props.languages.map((language, index) => {
    return (
      <li key={index}>
        {language.name} <br />
      </li>
    );
  });
};

const Weather = props => {
  const [data, setData] = useState(null);
  const fetchWeatherData = () => {
    const handleResponse = response => {
      console.log(response.data);
      setData(response.data);
    };
    const promise = axios.get(
      "http://api.weatherstack.com/current?access_key=3c25b5412639daee58bd8ceb9880f8cd&query=" +
        props.city
    );
    promise.then(handleResponse);
  };

  useEffect(fetchWeatherData, []);

  if (data == null) {
    return "";
  } else {
    return (
      <>
        <h4>temperature: {data.current.temperature} Celcius</h4>
        <img src={data.current.weather_icons[0]} alt="weather" height="50" />
        <h4>
          wind: {data.current.wind_speed} kph direction {data.current.wind_dir}
        </h4>
      </>
    );
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      console.log("list is showing");
      setCountries(response.data);
      console.log("response is showing", response.data);
    });
  }, []);

  const handleButtonInput = event => {
    console.log(event);
    setMessage(showCountry(event));
  };

  const showList = list =>
    list.map((country, index) => (
      <div key={index}>
        {country.name}
        <button onClick={() => handleButtonInput(country)}>show</button>
      </div>
    ));

  const showCountry = country => {
    return <Country country={country} />;
  };

  const handleNameSearch = event => {
    console.log(event.target.value);
    setSearchName(event.target.value);
    let list = countries.filter(country =>
      country.name.toUpperCase().includes(event.target.value.toUpperCase())
    );
    console.log(list);
    if (list.length > 10) {
      setMessage("Too many matches, specify another filter");
    } else if (list.length <= 10 && list.length > 1) {
      setMessage(showList(list));
    } else if (list.length === 1) {
      setMessage(showCountry(list[0]));
    }
  };

  return (
    <div>
      find countries <input value={searchName} onChange={handleNameSearch} />
      <div>{message}</div>
    </div>
  );
};

export default App;
