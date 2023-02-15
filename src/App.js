import React, { useState } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=10d0abbcdf303b4e1ca0acef06a9e859`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
            setLocation("");
        }
    };

    return (
        <div className="app">
            <div className="search">
                <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Введите локацию"
                    onKeyDown={searchLocation}
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? (
                            <h1>{Math.round((data.main.temp - 32) / 1.8) }°C</h1>
                        ) : null}
                    </div>
                    <div className="desc">
                        {data.weather ? (
                            <p>{data.weather[0].description}</p>
                        ) : null}
                    </div>
                </div>

                {data.name != undefined && (
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? (
                                <p className="bold">
                                    {Math.round((data.main.feels_like - 32) / 1.8)}
                                    °F
                                </p>
                            ) : null}
                            <p className="rubold">Ощущается</p>
                        </div>
                        <div className="humidity">
                            {data.main ? (
                                <p className="bold">{data.main.humidity}%</p>
                            ) : null}
                            <p className="rubold">Влажность</p>
                        </div>
                        <div className="wind">
                            {data.main ? (
                                <p className="bold">
                                    {Math.round(data.wind.speed * 0.44)} М/с
                                </p>
                            ) : null}
                            <p className="rubold">Ветер</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
