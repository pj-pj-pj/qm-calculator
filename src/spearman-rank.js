// code ni aron 😎✨✨
const { limitDecimalPoints } = require('./mean-median-mode');

function rank(data) {
  const sortedDescending = data.sort().reverse();
  const rankData = [];
  for (let i = 0; i < sortedDescending.length; i += 1) {
    rankData[i] = sortedDescending.indexOf(data[i]) + 1;
  }
  return rankData;
}

function calculateSpearmanRank(xData, yData) {
  const n = xData.length;
  const xRankData = rank(xData); const yRankData = rank(yData); const diData = [];
  for (let i = 0; i < n; i += 1) {
    diData[i] = xRankData[i] - yRankData[i];
  }
  const diSquaredData = diData.map((num) => num ** 2);
  const diSquaredSummation = diSquaredData.reduce((acc, val) => acc + val, 0);
  const spearmanRank = 1 - ((6 * diSquaredSummation) / (n * ((n ** 2) - 1)));

  return limitDecimalPoints(spearmanRank, 3);
}

// pwede mo nalang din gamitin yung getNature tsaka getStrength method
// dun sa simple-correlation module para dito sa spearman

module.exports = { rank, calculateSpearmanRank };
