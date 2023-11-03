const { getMean, getMedian, getMode, getVariance, getStandardDeviation } = require("../mean-median-mode");

it('mean', () => {
  const dataSet = [72, 94, 86, 71, 85, 87, 92, 79, 93, 82, 92, 70];
  expect(getMean(dataSet)).toEqual(83.583);
})

it('median', () => {
  const dataSet = [72, 94, 86, 71, 85, 87, 92, 79, 93, 82, 92, 70];
  expect(getMedian(dataSet)).toEqual(85.5);
})

it('mode', () => {
  const dataSet = [72, 94, 86, 71, 85, 87, 92, 79, 93, 82, 92, 70];
  expect(getMode(dataSet)).toEqual([92]);
})

it('multiple modes', () => {
  const dataSet = [72, 94, 86, 71, 85, 87, 92, 79, 93, 93, 82, 92, 70];
  expect(getMode(dataSet)).toEqual([92, 93]);
})

it('variance, type = sample', () => {
  const dataSet = [1, 1, 3, 7];
  expect(getVariance(dataSet, 'sample')).toEqual(8);
})

it('variance, type = population', () => {
  const dataSet = [1, 5, 6];
  expect(getVariance(dataSet, 'population')).toEqual(4.667);
})

it('standard deviation, type = sample', () => {
  const dataSet = [1, 1, 3, 7];
  expect(getStandardDeviation(dataSet, 'sample')).toEqual(2.828);
})
