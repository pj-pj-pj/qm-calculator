function getClassIntervals(dataSet, classNumber) {
  const range = Math.max(...dataSet) - Math.min(...dataSet);
  const classWidth = Math.ceil(range / classNumber);
  const ci = [];
  const maxClassInterval = Math.min(...dataSet) + ((classWidth * classNumber) - 1);
  for (let i = Math.min(...dataSet); i <= maxClassInterval; i += classWidth) {
    ci.push({ min: i, max: i + (classWidth - 1) });
  }

  return ci;
}

function groupToFreqDistTable(dataSet, classNumber) {
  dataSet.sort((a, b) => a - b);
  const fTable = {};

  fTable.classInterval = getClassIntervals(dataSet, classNumber);

  // computing class boundaries
  fTable.classBoundaries = fTable.classInterval.map((classInt) => ({
    min: classInt.min - 0.5,
    max: classInt.max + 0.5,
  }));

  // computing class mark
  fTable.classMark = fTable.classInterval.map((classInt) => (classInt.min + classInt.max) / 2);

  // computing class frequency
  fTable.classFrequency = [];
  for (let i = 0; i < classNumber; i += 1) {
    fTable.classFrequency.push(0);
    for (let j = 0; j < dataSet.length; j += 1) {
      if (dataSet[j] >= fTable.classInterval[i].min && dataSet[j] <= fTable.classInterval[i].max) {
        fTable.classFrequency[i] += 1;
      }
    }
  }

  // computing relative frequency
  fTable.relativeFrequency = fTable.classFrequency.map((frequency) => (
    Number((frequency / dataSet.length).toFixed(3))
  ));

  return fTable;
}

module.exports = groupToFreqDistTable;
