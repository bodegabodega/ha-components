import cloudDrizzle from './../assets/cloud-drizzle.svg?raw';
import cloudLightning from './../assets/cloud-lightning.svg?raw';
import cloudRain from './../assets/cloud-rain.svg?raw';
import cloudSnow from './../assets/cloud-snow.svg?raw';
import cloud from './../assets/cloud.svg?raw';
import moon from './../assets/moon.svg?raw';
import partlyCloudy from './../assets/partly-cloudy.svg?raw';
import sun from './../assets/sun.svg?raw';
import wind from './../assets/wind.svg?raw';

const conditionMap = {
  "clear-night": moon,
  "cloudy": cloud,
  "fog": cloud,
  "hail": cloudSnow,
  "lightning": cloudLightning,
  "lightning-rainy": cloudLightning,
  "partlycloudy": partlyCloudy,
  "pouring": cloudRain,
  "rainy": cloudDrizzle,
  "snowy": cloudSnow,
  "snowy-rainy": cloudSnow,
  "sunny": sun,
  "windy": wind,
  "windy-variant": wind,
  "exceptional": sun
}

export const forCondition = condition => {
  return condition in conditionMap ? conditionMap[condition] : '?';
}