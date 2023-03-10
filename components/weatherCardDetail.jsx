import { Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import DeviceThermostatTwoToneIcon from '@mui/icons-material/DeviceThermostatTwoTone';
import ThunderstormTwoToneIcon from '@mui/icons-material/ThunderstormTwoTone';
import AcUnitTwoToneIcon from '@mui/icons-material/AcUnitTwoTone';
import CloudQueueTwoToneIcon from '@mui/icons-material/CloudQueueTwoTone';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import DetailRow from "./detailRow";

export default function WeatherCardDetail({ forecastDetails, style, ...props }) {
    return (
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={styles.card}>
              <DetailRow data={`Feels like ${(Math.floor(forecastDetails.apparent_temperature_min + forecastDetails.apparent_temperature_max) / 2)}`} Icon={DeviceThermostatTwoToneIcon}/>
              <DetailRow data={`It will rain ${forecastDetails.rain_sum} ${forecastDetails.units.rain_sum}`} Icon={ThunderstormTwoToneIcon}/>
              <DetailRow data={`It will snow ${forecastDetails.snowfall_sum} ${forecastDetails.units.snowfall_sum}`} Icon={AcUnitTwoToneIcon}/>
              <DetailRow data={`Precipitation: ${forecastDetails.precipitation_sum} ${forecastDetails.units.precipitation_sum}`} Icon={CloudQueueTwoToneIcon}/>
              <DetailRow data={`UV Index: ${forecastDetails.uv_index_max} ${forecastDetails.units.uv_index_max}`} Icon={WbSunnyTwoToneIcon}/>
            </Paper>
          </Grid>
        </Grid>
    );
}

const styles = {
  card: {
    padding: 20
  }
}


WeatherCardDetail.propTypes = {
  forecastData: PropTypes.shape({
      date: PropTypes.object,
      temperature_2m_min: PropTypes.number,
      temperature_2m_max: PropTypes.number,
      apparent_temperature_min: PropTypes.number,
      apparent_temperature_max: PropTypes.number,
      uv_index_max: PropTypes.number,
      precipitation_sum: PropTypes.number,
      snowfall_sum: PropTypes.number,
      rain_sum: PropTypes.number,
      units: PropTypes.object
  })
};