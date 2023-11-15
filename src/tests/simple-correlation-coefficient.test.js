const { calculateSimpleCorrelation, getFinalLabel } = require("../simple-correlation-coefficient");

it('simple correlation coefficient', () => {
  const xData = [7, 6, 8, 5, 6, 9];
  const yData = [12, 8, 12, 10, 11, 13];

  expect(calculateSimpleCorrelation(xData, yData)).toBe(0.76);
})

it('simple correlation coefficient 2', () => {
  const xData = [10, 8, 2, 1 , 5, 6];
  const yData = [2, 3, 9, 7, 6, 5];

  expect(calculateSimpleCorrelation(xData, yData)).toBe(-0.937);
})

it('nature and strength: indirect strong correlation', () => {
  const xData = [10, 8, 2, 1 , 5, 6];
  const yData = [2, 3, 9, 7, 6, 5];

  expect(getFinalLabel(calculateSimpleCorrelation(xData, yData))).toBe('indirect strong correlation');
})

it('nature and strength: indirect intermediate correlation', () => {
  expect(getFinalLabel(-0.54)).toBe('indirect intermediate correlation');
})

it('nature and strength: direct weak correlation', () => {
  expect(getFinalLabel(0.11)).toBe('direct weak correlation');
})

it('nature and strength: no relation', () => {
  expect(getFinalLabel(0)).toBe('no relation');
})

it('nature and strength: perfect correlation', () => {
  expect(getFinalLabel(1)).toBe('perfect correlation');
  expect(getFinalLabel(-1)).toBe('perfect correlation');
})
