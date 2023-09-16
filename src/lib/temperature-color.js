import ColorScale from "color-scales";

const colors = new ColorScale(0, 100, ["#0018ff", "#00eaff", "#fcff00", "#ff7800", "#ff0000"]);

export const hexForTemperature = temperature => {
  let t = temperature > 100 ? 100 : temperature < 0 ? 0 : temperature;
  return colors.getColor(t).toHexString();
}