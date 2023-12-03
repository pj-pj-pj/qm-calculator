const { hypothesisTesting } = require('../hypothesis-testing');

test('testing hypothesisTesting function', () => {
  const result = hypothesisTesting('μ','>', 1000, 100, 1002, 1000, 14, 0.01);
  expect(result.z).toBe(1.43);
  expect(result.zc).toBe(0.9236);
  expect(result.PValue).toBe(0.0764);
  expect(result.conclusion).toBe('At the 1% level of significance, There is not enough evidence to support the claim.');
})