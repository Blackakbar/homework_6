import React, { useState } from "react";
import axios from "axios";

export default function App(){
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=ru&appid=42e9293d69cfe1b05369b8523003a67b`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation("")
      console.log(data)
    }
  }

  return(
    <>
          <div className="app">
            <div className="search">
              <input value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Введите название..."
              type="text"
              />
            </div>
            <div className="weather-container">
              <div className="top">
                <div className="location">
                  <p>{data.name}</p>
                </div>
                <div className="temp">
                  {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                </div>
                <div className="desc">
                  {data.weather ? <p>{data.weather[0].description}</p> : null}
                </div>
              </div>
              {data.name !== undefined && (
                <div className="bottom">
                  <div className="feels-like">
                    <p>Чувствуется как:</p>
                    {data.main ? (
                      <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                    ): null}
                  </div>
                  <div className="humidity">
                    <p>Влажность:</p>
                    {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                  </div>
                  <div className="wind">
                    <p>Скорость ветра:</p>
                    {data.wind ? (
                      <p className="bold">{data.wind.speed.toFixed()}м/с</p> 
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
    </>
  )
}