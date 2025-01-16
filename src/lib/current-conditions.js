const parsers = new Map([
  ['default', state => ({
    description: state.attributes.description,
    current: state.attributes.temperature,
    low: state.attributes.low,
    high: state.attributes.high,
    unit: state.attributes.unit,
    feelsLike: Math.round(state.attributes.feels_like)
  })]
])

export const currentConditionsForState = (state) => {
  let parser = parsers.get(state.attributes.attribution) || parsers.get('default');
  return parser(state);
}