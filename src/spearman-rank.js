// code ni aron 😎✨✨
const { limitDecimalPoints } = require('./mean-median-mode');

function rank(data) {
  let dataObjects = [];
  for (let i = 0; i < data.length; i++) {
    dataObjects.push({value: data[i], index: i});
  }

  let rankData = [];
  let mainSortedData = [];
  if (typeof data[0] === 'string'){
    mainSortedData = dataObjects;
  } else {
    mainSortedData = [...dataObjects].sort((a, b) => b.value - a.value);
  }
  //inserted two dumies para hindi sya malito sa variable i.
  mainSortedData.push({value: undefined, index: undefined});
  mainSortedData.push({value: undefined, index: undefined});
  const dataArray = [], duplicateRank = []; 
  
  for (let i = 0; i < data.length; i++) {
    if (mainSortedData[i].value === mainSortedData[i+1].value){
      let duplicate = mainSortedData[i].value;
      duplicateRank.push(i + 1);
      for (let j = i + 1; j < data.length; j++) {
        if (duplicate === mainSortedData[j].value) {
          duplicateRank.push(j + 1);
        }
      }

      i += duplicateRank.length;
    }
    

    if (duplicateRank.length > 0){
      const sum = duplicateRank.reduce((acc, val) => acc + val, 0);
      const n = duplicateRank.length;
      let average = sum/n;

      for (let i = 0; i < duplicateRank.length; i++) {
        duplicateRank[i] = average;
      }

      const len = duplicateRank.length;

      for (let i = 0; i < len; i++) {
        rankData.push(duplicateRank.pop());
      }
    }


    if (mainSortedData[i].value !== mainSortedData[i+1].value && i < data.length) {
      rankData.push(i + 1);
      dataArray.push(mainSortedData[i].value);
    } else if (mainSortedData[i].value === mainSortedData[i+1].value) {
      i--;
    }
  }
  
  let rankedData = [];
  for (let h = 0; h < data.length; h++) {
    rankedData[mainSortedData[h].index] = rankData[h];
  }
  return rankedData;
}

function calculateSpearmanRank(xData, yData) {
  const duplicatesChecker = hasDuplicates(xData) || hasDuplicates(yData);

  const n = xData.length;
  if (duplicatesChecker === false){
    const xRankData = rank(xData); const yRankData = rank(yData); const diData = [];

    for (let i = 0; i < n; i += 1) {
      diData[i] = xRankData[i] - yRankData[i];
    }
    const diSquaredData = diData.map((num) => num ** 2);
    const diSquaredSummation = diSquaredData.reduce((acc, val) => acc + val, 0);
    const spearmanRank = 1 - ((6 * diSquaredSummation) / (n * ((n ** 2) - 1)));

    return limitDecimalPoints(spearmanRank, 3);
  } else {
    const xRankData = rank(xData); const yRankData = rank(yData);
    const MRx = xRankData.reduce((acc, val) => acc + val, 0) / n;
    const MRy = yRankData.reduce((acc, val) => acc + val, 0) / n;
    let RxMinusMrxData = []; RyMinusMryData = []; ProductData = []; RaiseTo2Data = []; RxMinusMRxRaiseTo2Data = []; RyMinusMRyRaiseTo2Data = [];
    for (let i = 0; i < n; i++) {
      RxMinusMrxData[i] = xRankData[i] - MRx;
      RyMinusMryData[i] = yRankData[i] - MRy;
      ProductData[i] = RxMinusMrxData[i] * RyMinusMryData[i];
      RxMinusMRxRaiseTo2Data[i] = RxMinusMrxData[i] ** 2;
      RyMinusMRyRaiseTo2Data[i] = RyMinusMryData[i] ** 2;
    }

    const SummationOfProductData = ProductData.reduce((acc, val) => acc + val, 0);
    const SummationOfRxMinusMRxRaiseTo2Data = RxMinusMRxRaiseTo2Data.reduce((acc, val) => acc + val, 0);
    const SummationOfRyMinusMRyRaiseTo2Data = RyMinusMRyRaiseTo2Data.reduce((acc, val) => acc + val, 0);

    const spearmanRank = SummationOfProductData / (Math.sqrt(SummationOfRxMinusMRxRaiseTo2Data * SummationOfRyMinusMRyRaiseTo2Data))

    return limitDecimalPoints(spearmanRank, 3);
  }
}

function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}


module.exports = { rank, calculateSpearmanRank };
