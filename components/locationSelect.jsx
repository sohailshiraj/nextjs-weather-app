import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const locations = [
  {
    name: "Thorold",
    lat: 43.12806722816226,
    lng: -79.20240935773508,
  },
  {
    name: "Toronto",
    lat: 43.64236431420935,
    lng: -79.38719627675631,
  },
  {
    name: "New York City",
    lat: 40.690014093098746,
    lng: -74.04570206886868,
  },
  {
    name: "Ottawa",
    lat: 45.424916003892974,
    lng: -75.70012873480708,
  },
  {
    name: "Beijing",
    lat: 39.9055882409151,
    lng: 116.39718108693825,
  },
  {
    name: "Amsterdam",
    lat: 52.35779405729731,
    lng: 4.891692545476671,
  },
];

/**
 * @param onChange A callback function that is triggered when the selected element changes
 */
export default function LocationSelect({ onChange, style, ...props }) {
  const [value, setValue] = useState(locations[0]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (typeof onChange === "function") onChange(value);
  }, [value]);

  return (
    <FormControl fullWidth style={{ margin: "1em 0", ...style }}>
      <InputLabel id="location-select-label">Location</InputLabel>
      <Select
        labelId="location-select-label"
        id="location-select"
        label="Location"
        value={value}
        onChange={handleChange}
      >
        {locations.map((location) => (
          <MenuItem key={`key-${location.name}`} value={location}>
            {location.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

LocationSelect.propTypes = {
  onChange: PropTypes.func,
};
