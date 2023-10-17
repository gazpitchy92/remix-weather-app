import React, { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { SelectChangeEvent } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  StyledBox,
  StyledCard,
  AddCityButton,
  RemoveIconButton,
  WeatherIcon,
  WeatherInfoBox,
  WeatherCity,
  WeatherTemperature,
  RefreshButton,
  LogoutButton,
} from "../theme";
import { ukCities } from "../ukcities";

/**
 * Meta data for the page.
 * @type {MetaFunction}
 */
export const meta: MetaFunction = () => {
  return [
    { title: "Weather App" },
    { name: "Weather App", content: "Home Page" },
  ];
};

/**
 * The home page component of the Weather App.
 * @returns {JSX.Element} The rendered component.
 */
export default function HomePage() {
  // Cities and navigation
  const navigate = useNavigate();

  // Hooks
  const [cookies, setCookie] = useCookies(["loggedIn", "username"]);
  const [cities, setCities] = useState<string[]>([]);
  const [cityWeatherData, setCityWeatherData] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState(ukCities[0]);

  // Use effect
  useEffect(() => {
    if (!cookies.loggedIn || cookies.loggedIn === false) {
      navigate("/");
    } else {
      fetchWeatherData(cities);
    }
  }, [cookies, navigate, cities]);

  /**
   * Fetch weather data for the given cities.
   * @param {string[]} citiesToFetch - List of city names to fetch data for.
   */
  async function fetchWeatherData(citiesToFetch: any) {
    const apiKey = "e82c036befd246d78c1115154231610";
    const weatherDataPromises = citiesToFetch.map(async (city: any) => {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      if (response.ok) {
        return response.json();
      }
      return null;
    });

    const weatherData = await Promise.all(weatherDataPromises);
    setCityWeatherData(weatherData);
  }

  /**
   * Refreshes the weather data for the current cities.
   */
  const handleRefresh = async () => {
    fetchWeatherData(cities);
  };

  /**
   * Adds a city to the list of cities to fetch weather data for.
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleAddCity = async (event: React.FormEvent) => {
    event.preventDefault();
    const selectedCity = (event.target as HTMLFormElement).city.value;
    if (selectedCity && !cities.includes(selectedCity)) {
      const newCities = [...cities, selectedCity];
      setCities(newCities);
      await fetchWeatherData(newCities);
    }
  };

  /**
   * Handles the change of the selected city in the dropdown.
   * @param {SelectChangeEvent<string>} event - The select change event.
   */
  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value);
  };

  /**
   * Logs the user out by updating the cookie.
   */
  const handleLogout = () => {
    setCookie("loggedIn", "false", { path: "/" });
  };

  /**
   * Removes a city from the list of cities to fetch weather data for.
   * @param {string} cityToRemove - The name of the city to remove.
   */
  const handleRemoveCity = (cityToRemove: string) => {
    setCities((prevCities) =>
      prevCities.filter((city) => city !== cityToRemove)
    );
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <RefreshButton
        variant="contained"
        color="secondary"
        style={{ alignSelf: "flex-start", margin: "10px" }}
        onClick={handleRefresh}
      >
        Refresh
      </RefreshButton>
      <LogoutButton
        variant="contained"
        color="secondary"
        style={{ alignSelf: "flex-end", margin: "10px" }}
        onClick={handleLogout}
      >
        Logout
      </LogoutButton>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the weather app {cookies.username}
      </Typography>
      <form onSubmit={handleAddCity}>
        <StyledBox display="flex" flexDirection="column" alignItems="center">
          <Select
            name="city"
            variant="outlined"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {ukCities
              .filter((ukCity) => !cities.includes(ukCity))
              .map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
          </Select>
          <AddCityButton
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "8px" }}
          >
            Add City
          </AddCityButton>
        </StyledBox>
      </form>
      <Box display="flex" flexDirection="row">
        {cities.map((city, index) => {
          const weatherData = cityWeatherData[index];
          if (weatherData) {
            const {
              current: { condition, temp_c, humidity, precip_mm },
            } = weatherData;
            return (
              <StyledCard
                key={index}
                style={{ margin: "8px", padding: "20px" }}
              >
                <CardContent>
                  <WeatherInfoBox>
                    <WeatherCity>{city}</WeatherCity>
                    <WeatherIcon src={condition.icon} alt={condition.text} />
                    <WeatherTemperature>{temp_c}°C</WeatherTemperature>
                    <Typography variant="body1" gutterBottom>
                      Condition: {condition.text}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Humidity: {humidity}%
                    </Typography>
                    <Typography variant="body1">
                      Precipitation: {precip_mm} mm
                    </Typography>
                  </WeatherInfoBox>
                </CardContent>
                <Tooltip title="Remove city">
                  <RemoveIconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveCity(city)}
                    style={{ color: "red" }}
                  >
                    <Delete />
                  </RemoveIconButton>
                </Tooltip>
              </StyledCard>
            );
          } else {
            return (
              <StyledCard key={index} style={{ margin: "8px" }}>
                <CardContent>
                  <Typography variant="h6">{city}</Typography>
                  <div>Loading weather data...</div>
                </CardContent>
              </StyledCard>
            );
          }
        })}
      </Box>
    </Box>
  );
}
