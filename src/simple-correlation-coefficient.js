// code ni aron 😎😎
const { limitDecimalPoints } = require('./mean-median-mode');

function calculateSimpleCorrelation(xData, yData) {
  const summationX = xData.reduce((acc, val) => acc + val, 0);
  const summationY = yData.reduce((acc, val) => acc + val, 0);

  const xyData = []; const xSquaredData = []; const
    ySquaredData = [];
  for (let i = 0; i < xData.length; i += 1) {
    xyData[i] = xData[i] * yData[i];
    xSquaredData[i] = xData[i] ** 2;
    ySquaredData[i] = yData[i] ** 2;
  }

  const summationXY = xyData.reduce((acc, val) => acc + val, 0);
  const summationXSquared = xSquaredData.reduce((acc, val) => acc + val, 0);
  const summationYSquared = ySquaredData.reduce((acc, val) => acc + val, 0);
  const n = xData.length;

  const xSquaredDividedByN = summationX ** 2 / n;
  const ySquaredDividedByN = summationY ** 2 / n;

  const denominator = Math.sqrt(
    (summationXSquared - xSquaredDividedByN) * (summationYSquared - ySquaredDividedByN),
  );
  const numerator = summationXY - ((summationX * summationY) / n);
  const simpleCorrelation = numerator / denominator;
  return limitDecimalPoints(simpleCorrelation, 3);
}

function getNature(value) {
  if (value < 0) return 'indirect';
  if (value > 0) return 'direct';
  return '';
}

function getStrength(value) {
  const rawValueSC = Math.abs(value);
  if (rawValueSC > 0 && rawValueSC <= 0.25) return 'weak';
  if (rawValueSC > 0.25 && rawValueSC <= 0.75) return 'intermediate';
  if (rawValueSC > 0.75 && rawValueSC < 1) return 'strong';
  return '';
}

// eto yung main method para sa label niya
function getFinalLabel(value) {
  if (value === 0) return 'no relation';
  if (value === 1 || value === -1) return 'perfect correlation';
  return `${getNature(value)} ${getStrength(value)} correlation`;
}

module.exports = {
  calculateSimpleCorrelation, getNature, getStrength, getFinalLabel,
};
