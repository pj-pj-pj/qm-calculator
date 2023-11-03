const {
  limitDecimalPoints, getMean, getMedian, getStandardDeviation,
} = require('./mean-median-mode');

function calculateSkewness(data, type = 'population') {
  const skewness = (3 * (getMean(data) - getMedian(data))) / getStandardDeviation(data, type);
  return limitDecimalPoints(skewness, 3);
}

function getSymmetry(skewness) {
  if (skewness > 0) return 'positively skewed';
  if (skewness < 0) return 'negatively skewed';
  return 'normally skewed'; // === 0
}

module.exports = { calculateSkewness, getSymmetry };
