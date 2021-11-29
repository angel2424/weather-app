import { useEffect, useState } from 'react';
import './App.css';
import Weather from './Weather';
import moment from 'moment';

function App() {

  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [pending, setPending] = useState(null);
  
  const [weather, setWeather] = useState(null);

  //Fetch weather data
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
    })

    if(lat && long !== '') {
      fetch(`${process.env.REACT_APP_WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then(res => {
          if(!res.ok) {
            throw new Error('We could not fetch data')
          }
          return res.json()
        })
        .then((data) => {
          setPending(false)
          setWeather(data);
        })
        .catch(error => {
          console.log(error.message)
          setPending(null)
        })
    } else {
      setLat(28.7)
      setLong(-100.523)
    }
  }, [lat, long])

  const station = weather?.weather[0].icon;

  const handleSearch = (input) => {
    fetch(`${process.env.REACT_APP_WEATHER_API_URL}/weather?q=${input}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(res => {
      if(!res.ok) {
        throw new Error('We could not fetch data')
      }
      return res.json()
    })
    .then((data) => {
      setWeather(data);
    })
    .catch(error => {
      console.log(error.message)
    })
  }

  const handleRefresh = () => {
    setLat('');
    setLong('');
  }

  return (
    <div className="App" style={{backgroundImage: `url(https://angel2424.github.io/api/images-weather/${station}.jpg)`}}>
      <h3 className="App__logo">weather.</h3>
      <div className="App__info">
        <div>
          <h3 className="App__temperature">{`${Math.floor(weather?.main.temp)}`}&deg;</h3>
          <p className="App__feels">Feels like: {Math.floor(weather?.main.feels_like)}&deg;C</p>
        </div>
        <div>
          <h2 className="App__location">{weather?.name}</h2>
          <p className="App__date">{moment().format('MMMM Do YYYY')}</p>
        </div>
        <div className="App__iconAndCondition">
          <img className="App__icon" src={`https://angel2424.github.io/api/images-icons/${weather?.weather[0].icon}.png`} alt="" />
          <p className="App__weatherCondition">{weather?.weather[0].description}</p>
        </div>
      </div>
      <Weather handleRefresh={handleRefresh} handleSearch={handleSearch} weather={weather}/>
    </div>
  );
}

export default App;
