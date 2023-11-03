function limitDecimalPoints(num, decimalCount) {
  return Number(num.toFixed(decimalCount));
}

function getMean(data) {
  return limitDecimalPoints(data.reduce((acc, current) => acc + current, 0) / data.length, 3);
}

function getMedian(data) {
  const sorted = data.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function getMode(data) {
  const frequency = {};

  data.forEach((element) => {
    frequency[element] = (frequency[element] || 0) + 1;
  });

  let maxFreq = 0;
  let modes = [];
  modes = Object.keys(frequency).reduce((acc, key) => {
    const val = Number(key);
    const freq = frequency[key];
    if (freq > maxFreq) {
      modes = [val];
      maxFreq = freq;
    } else if (freq === maxFreq) {
      modes.push(val);
    }
    return modes;
  }, []);

  return modes.length === Object.keys(frequency).length ? [] : modes;
}

function getVariance(data, type = 'population') {
  const mean = getMean(data);
  const squaredDifferences = data.map((val) => (val - mean) ** 2);
  const n = (type === 'population') ? data.length : data.length - 1;

  return limitDecimalPoints(squaredDifferences.reduce((acc, val) => acc + val, 0) / n, 3);
}

function getStandardDeviation(data, type = 'population') {
  const variance = getVariance(data, type);
  return limitDecimalPoints(Math.sqrt(variance), 3);
}

module.exports = {
  limitDecimalPoints, getMean, getMode, getMedian, getVariance, getStandardDeviation,
};
