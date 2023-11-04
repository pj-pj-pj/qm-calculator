// code ni aron 😎😎
const { limitDecimalPoints } = require('./mean-median-mode');

function calculateSimpleCorrelation(xData, yData) {
  const summationX = xData.reduce((acc, val) => acc + val, 0);
  const summationY = yData.reduce((acc, val) => acc + val, 0);

  let xyData = [], xSquaredData = [], ySquaredData = [];
  for (let i = 0; i < xData.length; i++) {
    xyData[i] = xData[i] * yData[i];
    xSquaredData[i] = xData[i] ** 2;
    ySquaredData[i] = yData[i] ** 2;
  }

  const summationXY = xyData.reduce((acc, val) => acc + val, 0);
  const summationXSquared = xSquaredData.reduce((acc, val) => acc + val, 0);
  const summationYSquared = ySquaredData.reduce((acc, val) => acc + val, 0);
  const n = xData.length;

  const simpleCorrelation = (summationXY - ((summationX * summationY)/n)) / (Math.sqrt((summationXSquared - ((summationX ** 2)/n))*(summationYSquared - ((summationY ** 2)/n))));

  return limitDecimalPoints(simpleCorrelation, 3);
}

function getNature(value) {
  if (value < 0) return 'indirect';
  if (value > 0) return 'direct';
}

function getStrength(value) {
  const rawValueSC = Math.abs(value);
  if (rawValueSC === 1) return 'perfect';
  if (rawValueSC > 0 && rawValueSC <= 0.25) {return 'weak'}
  else if (rawValueSC > 0.25 && rawValueSC <= 0.75) {return 'intermediate'}
  else if (rawValueSC > 0.75 && rawValueSC < 1) {return 'strong'}
}

// eto yung main method para sa label niya
function getFinalLabel(value) {
  if (value === 0) return 'no relation';
  return `${getNature(value)} ${getStrength(value)} correlation`
}

module.exports = {calculateSimpleCorrelation, getNature, getStrength, getFinalLabel};