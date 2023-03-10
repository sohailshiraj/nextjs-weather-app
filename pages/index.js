import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import LocationSelect from "../components/locationSelect";
import WeatherCard from "../components/weatherCard";
import WeatherCardDetail from "../components/weatherCardDetail";

export default function Home() {
  const [forecast, SetForecast] = useState(null) //forecast
  const [forecastDetails, SetForecastDetails] = useState(null) //current selected forecast
  const [selectedIndex, SetSelectedIndex] = useState(-1); //current selected forecast index

  //Handler for getting forecast by location
  const getForecastByLocation = async (e) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${e.lat}&longitude=${e.lng}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum,rain_sum,snowfall_sum&timeformat=unixtime&timezone=America%2FNew_York`);
      const data = await res.json();
      SetForecast(data)
      resetForecastDetails();
    } catch (err) {
      SetForecast(null)
      resetForecastDetails();
      console.log(err);
    }
  }

  //Handler for structuring data into single object
  const getStructuredForecastData = (idx) => {
    return {
      date: new Date(forecast['daily']['time'][idx] * 1000),
      temperature_2m_min: forecast['daily']['temperature_2m_min'][idx],
      temperature_2m_max: forecast['daily']['temperature_2m_max'][idx],
      apparent_temperature_min: forecast['daily']['apparent_temperature_min'][idx],
      apparent_temperature_max: forecast['daily']['apparent_temperature_max'][idx],
      uv_index_max: forecast['daily']['uv_index_max'][idx],
      precipitation_sum: forecast['daily']['precipitation_sum'][idx],
      snowfall_sum: forecast['daily']['snowfall_sum'][idx],
      rain_sum: forecast['daily']['rain_sum'][idx],
      units: { ...forecast['daily_units'] }
    }
  }

  //Handler for clicking on forecast for details
  const showForecastDetails = (idx, data) => {
    SetSelectedIndex(idx)
    SetForecastDetails(data)
  }

  //reset forecast related data
  const resetForecastDetails = () => {
    SetForecastDetails(null)
    SetSelectedIndex(-1)
  }

  return (
    <Container>
      <LocationSelect onChange={getForecastByLocation} />
      <Box style={styles.forecastContainer} mb={1}>
        {
          forecast &&
          forecast.daily.time.map((item, idx) => {
            const data = getStructuredForecastData(idx)
            return (
              <WeatherCard key={idx} forecastData={data} selected={idx == selectedIndex} onClicked={() => { showForecastDetails(idx, data) }} />
            );
          })
        }
      </Box>
      {
        forecastDetails &&
        <WeatherCardDetail forecastDetails={forecastDetails} />
      }
    </Container>
  );
}

const styles = {
  forecastContainer: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'
  }
}