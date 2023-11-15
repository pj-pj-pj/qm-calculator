const { rank, calculateSpearmanRank } = require('../spearman-rank');

test('testing rank function (numerical)', () => {
  const data = [8,16,10,3,17];
  expect(rank(data)).toEqual([4,2,3,5,1])
})

test('testing rank function (ordinal)', () => {
  const data = ['University','High School','Elementary','Preparatory','Kindergarten'];
  expect(rank(data)).toEqual([1,2,3,4,5])
})

test('testing calculateSpearmanRank function', () => {
  const xData = [7,15,12,5,13,10,4,3];
  const yData = [8,10,19,4,15,23,12,14];
  expect(calculateSpearmanRank(xData,yData)).toBe(0.238)
})