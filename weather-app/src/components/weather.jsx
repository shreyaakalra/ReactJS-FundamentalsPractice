import { useState } from "react"

const API_KEY = "f82445198f4f38383d59e0d629ae4029";

export function Weather(){

    const[city, setCity] = useState("");
    const[error, setError] = useState(null);
    const[weather, setWeather] = useState(null);
    const[loading, setLoading] = useState(false);

    const fetchWeather = async() =>{

        if(!city) return;

        setLoading(true);
        setError(null);

        try{
            const geoRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);

            const geoData = await geoRes.json();

            if(!geoData) throw new Error("city not found")

            const { lat, lon, name, country, state } = geoData[0];

            const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

            if(!weatherData.ok) throw new Error("Weather data unavailable.")

            const data = await weatherData.json();

            const {temp, pressure, humidity} = data.main;
            const { speed } = data.wind;

            setWeather({
                location: `${name}, ${state || country}` ,
                temperature: Math.round(temp),
                pressure: pressure,
                humidity: humidity,
                wind: speed
            });

        } catch(error){
            setError(error);
        } finally{
            setLoading(false);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") fetchWeather();
    }


    return(
        <div>
            <h1>
                WEATHER APP
            </h1>
            <div>
                <input 
                    type="text"
                    input={city}
                    placeholder="enter city name here"
                    onChange={(e)=>setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{width:300}}
                />
                <button onClick={fetchWeather}>
                    {loading ? "searching.." : "search" }
                </button>
                {error && (<p>{error}</p>)}
                {weather && (
                    <div>
                        <h2><strong>Location: </strong>{weather.location}</h2>
                        <div>
                            <p><strong>Temperature: </strong>{weather.temperature}°C</p>
                            <p><strong>Pressure: </strong>{weather.pressure} atm</p>
                            <p><strong>Humidity: </strong>{weather.humidity}%</p>
                            <p><strong>Wind: </strong>{weather.wind} km/h</p>
                        </div>
                    </div>
                )}
                    
            </div>
        </div>
    );
}