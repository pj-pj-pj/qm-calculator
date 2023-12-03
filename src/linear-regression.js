const { limitDecimalPoints } = require('./mean-median-mode');

function linearRegression(xData, yData) {
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

  const xMean = limitDecimalPoints(summationX/n,3);
  const yMean = limitDecimalPoints(summationY/n,3);

  const b = limitDecimalPoints((summationXY - ((summationX*summationY)/n))/(summationXSquared - ((summationX ** 2)/n)), 3);
  const a = limitDecimalPoints(yMean - (b * xMean), 3);
  return {
    a: a,
    b: b,
    xyData: xyData,
    xSquaredData: xSquaredData,
    ySquaredData: ySquaredData,
    xMean: xMean,
    yMean: yMean,
    summationX: summationX,
    summationY: summationY,
    summationXY: summationXY,
    summationXSquared: summationXSquared,
    summationYSquared: summationYSquared
  };
}

module.exports = {linearRegression};