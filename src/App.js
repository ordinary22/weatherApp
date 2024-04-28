import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import WeatherBox from "./component/WeatherBox.js";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {

    const API_KEY = 'df5b417cbd0824e2737aba520467ae53';

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);

    const cities = ['seoul', 'paris', 'new york', 'tokyo']

    const getWeatherApi = async (lat, lng) => {
        setLoading(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        setWeather(data);
        setLoading(false);
    }

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                getWeatherApi(lat, lng);

                return `Current location: ${lat}, ${lng}`;
            });

        } else {
            console.log('불가능');
        }
    }

    const getWeatherByCity = async () => {
        setLoading(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        setWeather(data);
        setLoading(false);
    }

    useEffect(() => {

        if (city === "") {
            getCurrentLocation();
        } else {
            getWeatherByCity();
        }

    }, [city])

  return (
    <div>
        {
            loading ? (
                <div className="container">
                    <ClipLoader color="#f88c6b" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            ) : (
                <div className="container">
                    <WeatherBox weather={weather}/>
                    <WeatherButton cities={cities} setCity={setCity}/>
                </div>
            )
        }
    </div>
  );
}

export default App;
