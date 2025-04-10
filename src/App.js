
import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [city, setCity] = useState('Delhi')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const currentDate = new Date()

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()

  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
 

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
        setError(null)
      } else {
        setError(data.message);
        setWeatherData(null)
      }

    } catch (error) {
      console.log("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);

    }
  }
  useEffect(() => {
    fetchWeatherData()
  }, [])

  const handleInputChange = (e) => {
    setCity(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData()
  }

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return '/sun.webp';
      case "Clouds":
        return '/clouds.png';  
      case "Rain":
        return '/rain_with_cloud.webp'
      case "Snow":
        return '/snow.png';
      case "Thunderstorm":
        return '/thunder.webp';
      case "Drizzle":
        return '/drizzle.png';    
      case "Haze":  
        return '/rain.png'; 
      case "Mist":  
        return '/mist.webp';  
      default:
        return null;
    }
  };



  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>

            <h1 className='date'>{formattedDate}</h1>
            <div className="weather-data">
              <h2 className='city'>{weatherData.name}</h2>
              <img className='img' src={getWeatherIconUrl(weatherData.weather[0].main)} width="180px" alt="Weather Icon" />
              <h2 className='degree'>{weatherData.main.temp}<span className='degree-icon'>°</span></h2>
              <h2 className='country-per'>{weatherData.weather[0].main}
              </h2>
              <form className='form' onSubmit={handleSubmit}>
                <input type="text" className='input' placeholder='Enter city name' value={city} onChange={handleInputChange} required />
                <button type='submit'>Get</button>
              </form>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;



             

