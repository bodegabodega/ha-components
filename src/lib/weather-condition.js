const conditionMap = {
  "clear-night": "Clear Night",
  "cloudy": "Cloudy",
  "fog": "Foggy",
  "hail": "Hailing",
  "lightning": "Lightning",
  "lightning-rainy": "Lightning",
  "partlycloudy": "Partly Cloudy",
  "pouring": "Pouring",
  "rainy": "Raining",
  "snowy": "Snowing",
  "snowy-rainy": "Snowing & Raining",
  "sunny": "Sunny",
  "windy": "Windy",
  "windy-variant": "Windy",
  "exceptional": "Beautiful"
}

export const asAdjective = condition => {
  return condition in conditionMap ? conditionMap[condition] : '?';
}