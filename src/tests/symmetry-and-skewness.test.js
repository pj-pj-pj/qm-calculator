const { calculateSkewness, getSymmetry } = require('../symmetry-and-skewness');

it('skewness, type = sample', () => {
  const data = [1, 1, 3, 7];
  expect(calculateSkewness(data, 'sample')).toBe(1.061);
})

it('skewness, type = population', () => {
  const data = [1, 5, 6];
  expect(calculateSkewness(data, 'population')).toBe(-1.389);
})

it('symmetry of skewness, positive', () => {
  const data = [1, 1, 3, 7];
  expect(getSymmetry(calculateSkewness(data, 'sample'))).toBe('positively skewed');
})

it('symmetry of skewness, negative', () => {
  const data = [1, 5, 6];
  expect(getSymmetry(calculateSkewness(data, 'population'))).toBe('negatively skewed');
})


it('symmetry of skewness, normal', () => {
  const data = [1, 3, 5];
  expect(getSymmetry(calculateSkewness(data, 'population'))).toBe('normally skewed');
})
