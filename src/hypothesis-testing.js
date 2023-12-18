const { limitDecimalPoints } = require('./mean-median-mode');
const nullHypoOperators = ['≤','=','≥'];
const altHypoOperators = ['>','≠','<'];
const stats = require('mathjs');

function hypothesisTesting(parameter, operator, valueReference, n, sampleMean, populationMean, sd, alpha) {
  let nullHypo, altHypo, claim, tailOrientation;
  if (nullHypoOperators.includes(operator)){
    nullHypo = {operator: operator, valueReference: valueReference};
    if (operator === '≤'){
      altHypo = {operator: '>', valueReference: valueReference};
      tailOrientation = 'right-tailed';
    } else if (operator === '≥'){
      altHypo = {operator: '<', valueReference: valueReference};
      tailOrientation = 'left-tailed';
    } else if (operator === '='){
      altHypo = {operator: '≠', valueReference: valueReference};
      tailOrientation = 'two-tailed';
    }
    claim = nullHypo;
  } else if (altHypoOperators.includes(operator)) {
    altHypo = {operator: operator, valueReference: valueReference};
    if (operator === '>'){
      tailOrientation = 'right-tailed';
      nullHypo = {operator: '≤', valueReference: valueReference}
    } else if (operator === '<'){
      tailOrientation = 'left-tailed';
      nullHypo = {operator: '≥', valueReference: valueReference}
    } else if (operator === '≠'){
      tailOrientation = 'two-tailed';
      nullHypo = {operator: '=', valueReference: valueReference}
    }
    claim = altHypo;
  }
  const z = limitDecimalPoints(((sampleMean - populationMean) / (sd / limitDecimalPoints(Math.sqrt(n), 3))), 2);
  const zc = limitDecimalPoints((stats.erf(z / Math.sqrt(2)) / 2 + 0.5), 4);

  let PValue;
  if (tailOrientation === 'left-tailed'){
    PValue = zc;
  } else if (tailOrientation === 'right-tailed'){
    PValue = limitDecimalPoints((1 - zc), 4);
  } else if (tailOrientation === 'two-tailed'){
    PValue = limitDecimalPoints((2 * zc), 4);
  } 

  let rejectNullHypothesis = false;
  if (PValue <= alpha){
    rejectNullHypothesis = true;
  } else {
    rejectNullHypothesis = false;
  }

  let conclusion = ''; 
  if (claim === nullHypo){
    if (rejectNullHypothesis){
      conclusion = `At the ${alpha * 100}% level of significance, There is enough evidence to reject the claim.`;
    } else {
      conclusion = `At the ${alpha * 100}% level of significance, There is not enough evidence to reject the claim.`;
    }
  } else {
    if (rejectNullHypothesis){
      conclusion = `At the ${alpha * 100}% level of significance, There is enough evidence to support the claim.`;
    } else {
      conclusion = `At the ${alpha * 100}% level of significance, There is not enough evidence to support the claim.`;
    }
  }

  return {
    nullHypo: nullHypo, 
    altHypo: altHypo,
    claim: claim,
    tailOrientation: tailOrientation,
    z: z,
    zc: zc,
    PValue: PValue,
    conclusion: conclusion
  };
}

module.exports = { hypothesisTesting };