import { forCondition } from "./weather-icons";
import dayjs from "dayjs";

const prediction = ( hour, condition, temperature ) => {
  return { condition, hour, temperature }
}

const predictionBetween = ( date, condition, predictions ) => {
  return ( i ) => {
    const start = predictions[i].date;
    const end = predictions[i+1].date;
    if (date.isAfter(start) && date.isBefore(end)) {
      predictions.splice(i + 1, 0, {
        date: date,
        hour: date.format('h:mm'),
        condition: forCondition(condition),
        temperature: condition.toUpperCase()
      });
      return true;
    }
    return false;
  }
}

export const forEntityFromState = (hass, config) => {
  const stateObject = hass && hass.states ? hass.states[config.entity] : undefined;
  if ( !stateObject ) {
    return;
  }
  const predictions = [];
  const forecast = stateObject.attributes.forecast;
  const length = Math.min(config.numPredictions, forecast.length);
  for (let i = 0; i < length; i++) {
    const { datetime, condition, temperature, precipitation_probability } = forecast[i];
    const date = dayjs(datetime);
    predictions.push({
      date,
      condition: forCondition(condition),
      temperature: temperature + '°',
      precipitationProbability: precipitation_probability
    });
  }
  if( config.includeSun && hass && hass.states && hass.states['sun.sun'] ) {
    const sun = hass.states['sun.sun'];
    const sunrise = predictionBetween(dayjs(sun.attributes.next_rising), 'sunrise', predictions);
    const sunset = predictionBetween(dayjs(sun.attributes.next_setting), 'sunset', predictions);
    for( let i = 0; i < predictions.length - 1; i++ ) {
      sunrise(i) ? i++ : sunset(i) ? i++ : null;
    }
  }
  const cappedPredictions = predictions.slice(0, config.numPredictions);
  cappedPredictions.forEach((p, i) => {
    p.hour = p.hour ? p.hour : i % 2 == 0 ? p.date.format('h') : '&nbsp;';
  })
  return cappedPredictions;
}