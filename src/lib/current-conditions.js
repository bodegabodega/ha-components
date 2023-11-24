const parsers = new Map([
  ['default', state => ({
    description: state.state,
    current: state.attributes.temperature,
    low: state.attributes.forecast[0].templow,
    high: state.attributes.forecast[0].temperature,
    unit: state.attributes.temperature_unit
  })]
])

export const currentConditionsForState = (state) => {
  let parser = parsers.get(state.attributes.attribution) || parsers.get('default');
  return parser(state);
}