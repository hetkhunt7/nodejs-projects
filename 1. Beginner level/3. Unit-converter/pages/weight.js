function convertWeight(value, from, to) {
  // convert everything to grams first
  const toGrams = {
    milligram: 0.001,
    gram: 1,
    kilogram: 1000,
    ounce: 28.3495,
    pound: 453.592
  };

  if (!toGrams[from] || !toGrams[to]) return null;

  const inGrams = value * toGrams[from];
  const result = inGrams / toGrams[to];
  return parseFloat(result.toFixed(6));
}

module.exports = { convertWeight };