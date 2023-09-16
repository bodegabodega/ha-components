import { forCondition } from "./weather-icons";
import dayjs from "dayjs";

const prediction = ( hour, condition, temperature ) => {
  return { condition, hour, temperature }
}

export const forEntityFromState = (entityName, hass, numPredictions = 7) => {
  const stateObject = hass && hass.states ? hass.states[entityName] : undefined;
  if ( !stateObject ) {
    throw new Error('Unable to find entity state');
  }
  const predictions = [];
  predictions.push(prediction('NOW', forCondition(stateObject.state), stateObject.attributes.temperature))
  const forecast = stateObject.attributes.forecast;
  const length = Math.min((numPredictions - 1), forecast.length);
  for (let i = 0; i < length; i++) {
    const { datetime, condition, temperature } = forecast[i];
    const hour = i % 2 == 1 ? dayjs(datetime).format('h') : '&nbsp;';
    predictions.push({
      hour,
      condition: forCondition(condition),
      temperature: temperature
    });
  }
  return predictions;
}


/*
"weather.forecast_garden_street_hourly": {
  "entity_id": "weather.forecast_garden_street_hourly",
  "state": "cloudy",
  "attributes": {
    "temperature": 74,
    "temperature_unit": "°F",
    "humidity": 89,
    "cloud_coverage": 97.7,
    "pressure": 30.08,
    "pressure_unit": "inHg",
    "wind_bearing": 34.9,
    "wind_speed": 6.96,
    "wind_speed_unit": "mph",
    "visibility_unit": "mi",
    "precipitation_unit": "in",
    "forecast": [{
      "condition": "cloudy",
      "datetime": "2023-09-09T14:00:00+00:00",
      "wind_bearing": 40.5,
      "cloud_coverage": 100,
      "temperature": 77,
      "wind_speed": 5.84,
      "precipitation": 0,
      "humidity": 84
    }, {
*/