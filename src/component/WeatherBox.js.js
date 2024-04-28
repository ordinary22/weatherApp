import React from 'react';

const WeatherBox = ({weather}) => {

    return (
        <div className="weather-box">
            <div>{weather?.name}</div>
            <div>{weather?.main.temp}C / {(weather?.main.temp * 9/5) + 32} 화씨</div>
            <div>{weather?.weather[0].description}</div>
        </div>
    );
};

export default WeatherBox;