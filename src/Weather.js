import './Weather.css'
import sunrise from './images/sunrise.png'
import sunset from './images/sunset.png'
import { useState } from 'react';

const Weather = ({ handleRefresh, handleSearch, weather}) => {
    const [input, setInput] = useState('')

    const handlePress = (e) => {
        if(e.key === 'Enter') {
            handleSearch(input);
            e.target.value = ''
        }
    }

    return (
        <div className="weather">
            <div className="weather__search">
                <input placeholder="Find location" onChange={e => setInput(e.target.value)} onKeyPress={handlePress} type="text" />
                <button onClick={() => handleSearch(input)}></button>
            </div>
            <button className="weather__myLocation" onClick={() => handleRefresh()}>My Location</button>
            <div className="weather__minmax">
                <div>
                    <p>Min. Temperature</p>
                    <span>{Math.floor(weather?.main.temp_min)}&deg;C</span>
                </div>
                <div>
                    <p>Max. Temperature</p>
                    <span>{Math.floor(weather?.main.temp_max)}&deg;C</span>
                </div>
            </div>
            <div className="weather__sunriseAndSet">
                <div className="weather__sun">
                    <p>Sunrise</p>
                    <div>
                        <img src={sunrise} alt="" />
                        <span>{new Date(weather?.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</span>
                    </div>
                </div>
                <div className="weather__sun">
                    <p>Sunset</p>
                    <div>
                        <img src={sunset} alt="" />
                        <span>{new Date(weather?.sys.sunset * 1000).toLocaleTimeString('en-IN')}</span>
                    </div>
                </div>
            </div>
            <div className="weather__windAndHumidity">
                <div>
                    <p>Wind</p>
                    <span>{Math.floor(weather?.wind.speed)} Km/h</span>
                </div>
                <div>
                    <p>Humidity</p>
                    <span>{weather?.main.humidity}%</span>
                </div>
            </div>
            <div className="weather__pressure">
                    <p>Pressure</p>
                    <span>{Math.floor(weather?.main.pressure)}Ph</span>
            </div>
        </div>
    )
}

export default Weather
