// code ni aron 😎✨✨
const { limitDecimalPoints } = require('./mean-median-mode');

function rank(data) {
  let rankData = [];
  if (typeof data[0] === 'string'){
    for (let i = 0; i < data.length; i++) {
      rankData[i] = i + 1;
    }
  } else {
    const sortedDescending = [...data].sort((a, b) => a - b).reverse();
  
    for (let i = 0; i < sortedDescending.length; i++) {
      rankData[i] = sortedDescending.indexOf(data[i]) + 1;
    }
  }
  
  return rankData;
}

function calculateSpearmanRank(xData, yData) {
  const n = xData.length;
  let xRankData = rank(xData), yRankData = rank(yData), diData = [];
  for (let i = 0; i < n; i++) {
    diData[i] = xRankData[i] - yRankData[i];
  }
  let diSquaredData = diData.map((num) => num ** 2);
  const diSquaredSummation = diSquaredData.reduce((acc, val) => acc + val, 0);  
  const spearmanRank = 1 - ((6 * diSquaredSummation) / (n * ((n ** 2) - 1)));

  return limitDecimalPoints(spearmanRank, 3);
}

// pwede mo nalang din gamitin yung getNature tsaka getStrength method dun sa simple-correlation module para dito sa spearman

module.exports = {rank, calculateSpearmanRank};