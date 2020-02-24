import React, {useState, useEffect} from 'react';
import Weather from './Weather'
import API_KEY from '../../API_KEY';

const divStyles = {
    display: "inline-block",
    padding : "1rem", 
    margin: "1rem", 
    backgroundColor: "#e4e4e4"
}

const Country = ({country}) => {
    const [ weatherData, setWeatherData ] = useState(null);
    const { name, capital, population, languages, flag : flagUrl} = country;

    const fetchWeatherData = () => {
        fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
          .then(res => res.json())
          .then(setWeatherData)
    }
    
    useEffect(fetchWeatherData, []);

    return (
        <div style = {divStyles}>
            <h1>{name}</h1>
            <p>{`Capital: ${capital}`}</p>
            <p>{`Population: ${population}`}</p>
            <h2>Languages</h2>
            <ul>{languages.map(language => <li key = {language.name}>{language.name}</li>)}</ul>
            <img height = "200px" alt = {`flag of ${name}`} src = {flagUrl}/>
            {weatherData && <Weather capital = {capital} weatherData = {weatherData.current}/>}
        </div>
    )
}

export default Country