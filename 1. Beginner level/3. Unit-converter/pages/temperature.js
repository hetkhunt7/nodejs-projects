function convertTemperature(value, from, to) {
  let celsius;

  // convert to celsius first
  if (from === 'celsius') {
    celsius = value;
  } else if (from === 'fahrenheit') {
    celsius = (value - 32) * 5 / 9;
  } else if (from === 'kelvin') {
    celsius = value - 273.15;
  } else {
    return null;
  }

  // convert from celsius to target
  if (to === 'celsius') return parseFloat(celsius.toFixed(6));
  if (to === 'fahrenheit') return parseFloat((celsius * 9 / 5 + 32).toFixed(6));
  if (to === 'kelvin') return parseFloat((celsius + 273.15).toFixed(6));

  return null;
}

module.exports = { convertTemperature };