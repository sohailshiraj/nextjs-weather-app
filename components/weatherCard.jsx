import { Box, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DetailRow from "./detailRow";
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import AcUnitTwoToneIcon from '@mui/icons-material/AcUnitTwoTone';

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export default function WeatherCard({ forecastData, selected, onClicked, style, ...props }) {
    return (
        <Paper elevation={5} style={!selected? styles.container: {...styles.container, ...styles.selectedContainer}} onClick={() => {
            onClicked(forecastData)
        }}> 
            <Box>
                <Typography variant={'h6'}>{weekday[forecastData.date.getDay()]}</Typography>
                <Typography variant={'body2'}>{`(${forecastData.date.toLocaleDateString()})`}</Typography>
            </Box>
            <Box>
                <DetailRow data={`${forecastData.temperature_2m_max} ${forecastData.units.temperature_2m_max}`} Icon={WbSunnyTwoToneIcon}/>
                <DetailRow data={`${forecastData.temperature_2m_min} ${forecastData.units.temperature_2m_min}`} Icon={AcUnitTwoToneIcon}/>
            </Box>
        </Paper>
    );
}

const styles = {
    container: {
        height: 150, width: 150, textAlign: 'center', cursor: 'pointer', alignItems: 'center', marginBottom: 10,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'
    },
    selectedContainer: {backgroundColor: '#d3d3d3'}
}

WeatherCard.propTypes = {
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