function convertLength(value, from, to) {
    const toMeter = {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
    }
    
    if(!toMeter[from] || !toMeter[to]) return null;

    const inMeter = value * toMeter[from];
    const result = inMeter / toMeter[to];
    return parseFloat(result.toFixed(6));
}

module.exports = { convertLength };