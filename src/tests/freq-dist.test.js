const groupToFreqDistTable = require('../freq-dist.js');

it('test ungrouped frequency dist table', () => {
  const dataSet = [72, 94, 86, 71, 85, 87, 92, 79, 93, 82, 92, 70];
  const classNumber = 5;
  const result = groupToFreqDistTable(dataSet, classNumber);
  
  expect(result.classInterval).toEqual([
      { min: 70, max: 74 },
      { min: 75, max: 79 },
      { min: 80, max: 84 },
      { min: 85, max: 89 },
      { min: 90, max: 94 },
    ]);
  expect(result.classBoundaries).toEqual(
    [
      { min: 69.5, max: 74.5 },
      { min: 74.5, max: 79.5 },
      { min: 79.5, max: 84.5 },
      { min: 84.5, max: 89.5 },
      { min: 89.5, max: 94.5 },
    ]);
    expect(result.classMark).toEqual([72, 77, 82, 87, 92]);
    expect(result.classFrequency).toEqual([3, 1, 1, 3, 4]);
    expect(result.relativeFrequency).toEqual([0.25, 0.083, 0.083, 0.25, 0.333]);
});


