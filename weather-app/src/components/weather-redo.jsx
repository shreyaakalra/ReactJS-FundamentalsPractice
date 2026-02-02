import { useState } from "react"

const API_KEY = "f82445198f4f38383d59e0d629ae4029"


export function WeatherRedo (){

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getWeather = async() => {
        if(city==="") return;

        try{

        setLoading(true);

        const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);

        const geoData = await geoRes.json();

        if(!geoData || geoData.length === 0) throw new Error("City not found");

        const { lat, lon, name, country, state } = geoData[0];

        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        if(!weatherRes.ok) throw new Error("Weather data unavailable");

        const data = await weatherRes.json();

        const { temp, pressure, humidity} = data.main;
        const { speed } = data.wind;

        setWeather({
            location: `${name}, ${state || country}`,
            temperature: Math.round(temp),
            pressure,
            humidity,
            windSpeed: speed
        })

        setError("");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    const onKeyDown = (e) => {
        if(e.key==="Enter") getWeather();
    }



    return(
        <div>
            <h1>Weather Report</h1>
            <div>
            <input
                type="text"
                onInput={(e)=>setCity(e.target.value)}
                value={city}
                onKeyDown={onKeyDown}
                placeholder="Enter city name..."
                style={{width: "500px"}}
            />
            <button onClick={getWeather}>
                {loading ? "LOADING...." : "SEARCH" }
            </button>
            </div>
            {error && (<p>Error: {error}</p>)}
            {weather && (
                <div>
                    <p><strong>Name: </strong>{weather.location}</p>
                    <p><strong>Temperature: </strong> {weather.temperature}°C</p>
                    <p><strong>Pressure: </strong>{weather.pressure} ATM</p>
                    <p><strong>Humidity: </strong>{weather.humidity}%</p>
                    <p><strong>Wind: </strong>{weather.windSpeed} km/h</p>
                </div>
            )}
        </div>
    );
}