const components = document.querySelectorAll('.ha-component');
components.forEach((component) => {
  let config = JSON.parse(component.getAttribute('config'));
  component.setConfig(config);
  component.hass = hass;
});
setInterval(() => {
  components.forEach((component) => {
    component.hass = hass;
  });
}, 5000);