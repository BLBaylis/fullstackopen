import React from 'react';

const Weather = ({capital, weatherData}) => {
    const {temperature, wind_speed: speed, wind_dir: direction, weather_icons: iconUrl} = weatherData;
    return (
        <>
            <h2>{`Weather in ${capital}`}</h2>
            <p>{`Temperature: ${temperature} Celsius`}</p>
            <img src = {iconUrl}/>
            <p>{`Wind: ${speed} ${direction}`}</p>
        </>
    )
}

export default Weather