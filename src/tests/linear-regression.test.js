const { linearRegression } = require('../linear-regression');

test('testing linearRegression function (a)', () => {
  const xData = [7,6,8,5,6,9];
  const yData = [12,8,12,10,11,13]; 
  expect(linearRegression(xData,yData).b).toBe(0.923);
  expect(linearRegression(xData,yData).a).toBe(4.693);
})
