import { useState } from "react";
import "./App.css";
import Search from "./Components/Search/search";
import CurrentWeather from "./Components/current-weather/current-weather";
import Forecast from "./Components/forecast/forecast";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecastWeather, setForecast] = useState(null);

	const handleOnSearchChange = (searchData: any) => {
		//		console.log(searchData);
		const [lat, lon] = searchData.value.split(" ");

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);
		const forecastFetch = fetch(
			`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
		);

		https: Promise.all([currentWeatherFetch, forecastFetch])
			.then(async (response) => {
				const weatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();
				setCurrentWeather({ city: searchData.label, ...weatherResponse });
				setForecast({ city: searchData.label, ...forecastResponse });
			})
			.catch((err) => console.log(err));
	};

	//	console.log(currentWeather);
	//	console.log(forecastWeather);

	return (
		<div className="container">
			<Search onSearchChange={handleOnSearchChange} />
			{currentWeather && <CurrentWeather data={currentWeather} />}
			{forecastWeather && <Forecast data={forecastWeather} />}
		</div>
	);
}

export default App;
