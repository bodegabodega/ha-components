let counter = 0;
const components = document.querySelectorAll('.ha-component');
components.forEach((component) => {
  let config = JSON.parse(component.getAttribute('config'));
  component.setConfig(config);
  component.hass = hass;
});
setInterval(() => {
  components.forEach((component) => {
    component.hass = hass;
    if(counter % 5 == 0) {
      let config = JSON.parse(component.getAttribute('config'));
      component.setConfig(config);
    }
  });
  counter++;
}, 1000);