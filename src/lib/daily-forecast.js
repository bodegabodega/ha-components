import { forCondition } from "./weather-icons";
import dayjs from "dayjs";
import ColorScale from "color-scales";

const getHighestHigh = ( ranges ) => ranges.reduce((acc, curr) => curr.temperature > acc ? curr.temperature : acc, Number.MIN_VALUE);
const getLowestLow = ( ranges ) => ranges.reduce((acc, curr) => curr.templow < acc ? curr.templow : acc, Number.MAX_VALUE);
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const colors = new ColorScale(0, 100, ["#0018ff", "#00eaff", "#fcff00", "#ff7800", "#ff0000"]);

export const forEntityFromState = (entityName, hass, gaugeHeight = 80) => {
  const stateObject = hass && hass.states ? hass.states[entityName] : undefined;
  if ( !stateObject ) {
    throw new Error('Unable to find entity state');
  }
  const forecast = stateObject.attributes.forecast;
  const highestHigh = getHighestHigh(forecast);
  const lowestLow = getLowestLow(forecast);
  const range = highestHigh - lowestLow;
  // const tempsHeight = document.getElementById('temps').offsetHeight;
  const tickHeight = gaugeHeight / range;
  const predictions = forecast.map((prediction) => {
    const { datetime, temperature, templow, condition } = prediction;
    const diff = temperature - templow;
    const offset = Math.round(( highestHigh - temperature ) * tickHeight);
    const height = diff * tickHeight;
    // const rangeEl = el.getElementsByClassName('range')[0];
    // rangeEl.style.top = `${offset}px`;
    // rangeEl.style.height = `${height}px`;
    return {
      day: days[dayjs(datetime).day()],
      high: temperature,
      highHex: colors.getColor(Math.min(temperature, 100)).toHexString(),
      low: templow,
      lowHex: colors.getColor(Math.max(templow, 0)).toHexString(),
      offset,
      height,
      condition: forCondition(condition)
    }
  })
  return predictions;
}


/*
"weather.forecast_garden_street": {
      "entity_id": "weather.forecast_garden_street",
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
          "datetime": "2023-09-09T16:00:00+00:00",
          "wind_bearing": 52.3,
          "temperature": 83,
          "templow": 73,
          "wind_speed": 8.95,
          "precipitation": 0.09,
          "humidity": 72
        }, {
*/