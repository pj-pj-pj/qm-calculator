import { unchild } from './index';
import { hypothesisTesting } from './hypothesis-testing';

const main = document.querySelector('main');
const container = document.createElement('div');
container.id = 'hypothesis-testing-container';

function checkIfNumber(e) {
  const { key } = e;
  if ((key >= '0' && key <= '9')) {
    return true;
  }
  e.preventDefault();
  return false;
}

function displayResults(parameter, operator, valueReference, n, sampleMean, populationMean, sd, alpha) {
  const hypothesisTestingValues = hypothesisTesting(parameter, operator, valueReference, n, sampleMean, populationMean, sd, alpha);

  const pconclu = document.createElement('p');
  pconclu.innerHTML = `<b>Conclusion:</b> "${hypothesisTestingValues.conclusion}"`;

  const pvalues = document.createElement('p');
  pvalues.innerHTML = `Computed Values:`;

  let pnullHypo = document.createElement('p');
  let paltHypo = document.createElement('p');
  if (hypothesisTestingValues.claim === hypothesisTestingValues.nullHypo){
    pnullHypo.innerHTML = `<b>Null Hypothesis (Ho):</b> ${parameter} ${hypothesisTestingValues.nullHypo.operator} ${hypothesisTestingValues.nullHypo.valueReference} (Claim)`;
    paltHypo.innerHTML = `<b>Alternative Hypothesis (Ha):</b> ${parameter} ${hypothesisTestingValues.altHypo.operator} ${hypothesisTestingValues.altHypo.valueReference}`;
  } else {
    pnullHypo.innerHTML = `<b>Null Hypothesis (Ho):</b> ${parameter} ${hypothesisTestingValues.nullHypo.operator} ${hypothesisTestingValues.nullHypo.valueReference}`;
    paltHypo.innerHTML = `<b>Alternative Hypothesis (Ha):</b> ${parameter} ${hypothesisTestingValues.altHypo.operator} ${hypothesisTestingValues.altHypo.valueReference} (Claim)`;
  }

  const pz = document.createElement('p');
  pz.innerHTML = `<b>Value of computed Z-Score:</b> ${hypothesisTestingValues.z}`;
  const pztable = document.createElement('p');
  pztable.innerHTML = `<b>Corresponding value of z-score on Z-table:</b> ${hypothesisTestingValues.zc} `;
  const ptailorientation = document.createElement('p');
  ptailorientation.innerHTML = `<b>Tail Orientation:</b> ${hypothesisTestingValues.tailOrientation} test`;
  const ppvalue = document.createElement('p');
  ppvalue.innerHTML = `<b>P Value:</b> ${hypothesisTestingValues.PValue} `;

  container.append(pconclu, pvalues, pnullHypo, paltHypo, pz, pztable, ptailorientation, ppvalue);
}

function makeDropDownUI(active, list, id) {
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'dropdown';
  dropdownContainer.id = id;

  const selectContainer = document.createElement('div');
  selectContainer.className = 'select';
  const spanElement = document.createElement('span');
  spanElement.className = 'selected';
  spanElement.innerHTML = active;
  const caretDiv = document.createElement('div');
  caretDiv.className = 'caret';
  selectContainer.append(spanElement, caretDiv);

  const menuList = document.createElement('ul');
  menuList.className = 'menu';

  for (let item of list) {
    const choice = document.createElement('li');
    choice.innerHTML = item;
    if (item === active) {
      choice.className = 'active';
    }
    menuList.append(choice);
  }

  dropdownContainer.append(selectContainer, menuList);

  const select = dropdownContainer.querySelector('.select');
  const caret = dropdownContainer.querySelector('.caret');
  const menu = dropdownContainer.querySelector('.menu');
  const options = dropdownContainer.querySelectorAll('.menu li');
  const selected = dropdownContainer.querySelector('.selected');

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  let selectedOption = active;

  menuList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const clickedOption = event.target;
      selected.innerText = clickedOption.innerText;

      // Update the selected option
      selectedOption = clickedOption.innerText;

      // Remove 'active' class from all options
      options.forEach(option => {
        option.classList.remove('active');
      });

      // Add 'active' class to the clicked option
      clickedOption.classList.add('active');

      // Close the menu
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
    }
  });

  function getSelectedOption() {
    return selectedOption;
  }

  const UI = dropdownContainer;
  return {
    UI,
    getSelectedOption
  };
}

function makeTextInputUI(name, placeholder, className, keyPressEventListener) {
  const inputUI = document.createElement('input');
  inputUI.type = 'text';
  inputUI.name = name;
  inputUI.placeholder = placeholder;
  inputUI.className = className;
  inputUI.addEventListener('keypress', keyPressEventListener);
  return inputUI;
}

function hypoTestingFormInit(form) {
  const pclaim = document.createElement('label');
  pclaim.textContent = `Claim: `;
  pclaim.className = 'displayInline';

  const parameterDropdown = makeDropDownUI('μ', ['μ', 'p'], 'parameter');
  const operatorDropdown = makeDropDownUI('≤', ['≤','=','≥', '>','≠','<'], 'operator');
  const valueReferenceInput = makeTextInputUI('valueReference', '100', 'displayInline', checkIfNumber);
  pclaim.appendChild(parameterDropdown.UI);
  pclaim.appendChild(operatorDropdown.UI);
  pclaim.appendChild(valueReferenceInput);
  
  const pn = document.createElement('label');
  pn.textContent = `Sample size (n): `;
  pn.className = 'displayInline';
  const nInput = makeTextInputUI('sampleSize', '30', 'displayInline', checkIfNumber);
  pn.appendChild(nInput);
  
  const pSampleMean = document.createElement('label');
  pSampleMean.textContent = `Sample mean (x̄): `;
  pSampleMean.className = 'displayInline';
  const sampleMeanInput = makeTextInputUI('sampleMean', '45', 'displayInline', checkIfNumber);
  pSampleMean.appendChild(sampleMeanInput);
  
  const pPopulationMean = document.createElement('label');
  pPopulationMean.textContent = `Population mean (μ): `;
  pPopulationMean.className = 'displayInline';
  const populationMeanInput = makeTextInputUI('populationMean', '55', 'displayInline', checkIfNumber);
  pPopulationMean.appendChild(populationMeanInput);

  const psd = document.createElement('label');
  psd.textContent = `Standard Deviation (s): `;
  psd.className = 'displayInline';
  const sdInput = makeTextInputUI('standardDeviation', '10', 'displayInline', checkIfNumber);
  psd.appendChild(sdInput);

  const palpha = document.createElement('label');
  palpha.textContent = `Alpha (a): `;
  palpha.className = 'displayInline';
  const alphaDropdown = makeDropDownUI('0.05', ['0.05', '0.01', '0.10'], 'alpha');
  palpha.appendChild(alphaDropdown.UI);


  const submit = document.createElement('button');
  submit.textContent = 'Show Hypothesis Testing Computation';
  submit.type = 'submit';

  const warningMsg = document.createElement('p');
  warningMsg.textContent = 'All* fields are required';
  warningMsg.style.display = 'none';
  warningMsg.style.color = 'red';
  warningMsg.style.textAlign = 'center';

  const inputs = [valueReferenceInput, nInput, sampleMeanInput, populationMeanInput, sdInput];

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    unchild(container);

    let valid = true;
    for (let input of inputs) {
      if (input.value === '' || isNaN(Number(input.value.trim()))){
        valid = false;
        break;
      }
    }

    if (!valid) {
      // display error
      warningMsg.style.display = 'block';
    } else { // undisplay error and display results
      const parameter = parameterDropdown.getSelectedOption();
      const operator = operatorDropdown.getSelectedOption();
      const valueReference = Number(valueReferenceInput.value.trim());
      const n = Number(nInput.value.trim());
      const sampleMean = Number(sampleMeanInput.value.trim());
      const populationMean = Number(populationMeanInput.value.trim());
      const sd = Number(sdInput.value.trim());
      const alpha = Number(alphaDropdown.getSelectedOption().trim());

      displayResults(parameter, operator, valueReference, n, sampleMean, populationMean, sd, alpha);
      warningMsg.style.display = 'none';
    }
  });

  form.append(pclaim, pn, pSampleMean, pPopulationMean, psd, palpha, submit, warningMsg);
}

export default function hypoTestingUIinit() {
  const headerTt = document.createElement('h2');
  headerTt.textContent = '# Hypothesis Testing';

  const overview = document.createElement('div');
  overview.innerHTML = "<p>Hypothesis testing is a way for researchers to figure out if the differences they see in data are likely real or just due to random chance. It involves making <b>educated guesses</b>, called <b>hypotheses</b>, and then using statistical methods to check if the data <i>supports</i> or <i>contradicts</i> these guesses. The process helps determine if observed effects are genuine or could have happened by random fluctuations.</p>";
  overview.innerHTML += '<p>It involves formulating a null hypothesis (Ho), representing a default assumption of no effect, and an alternative hypothesis (H1) or (Ha), suggesting a significant difference or effect.</p>';

  const form = document.createElement('form');
  form.id = 'hypothesis-testing-form';

  hypoTestingFormInit(form);

  const formula = document.createElement('div');
  formula.innerHTML = '<h3>✏️ How It Works</h3>';
  formula.innerHTML += '<p>To interpret hypothesis testing:</p>';
  formula.innerHTML += "The calculator uses a hypothesis testing function for conducting hypothesis tests on a sample mean. The function takes parameters such as the operator (<, >, =) for the null hypothesis, a reference value, sample size, sample mean, standard deviation, and significance level (alpha). It constructs null and alternative hypotheses, determines the tail orientation of the test, calculates the test statistic (z), converts it to a cumulative probability (zc), and computes the p-value based on the tail orientation. The function then decides whether to reject the null hypothesis based on the p-value and significance level. Finally, it generates a conclusion statement, indicating whether there is enough evidence to reject or support the null hypothesis. The results, including hypotheses, test statistics, p-value, and the conclusion, are returned in an object.";
  formula.innerHTML += '<p>Expressed in javascript:</p>';
  formula.innerHTML += `<p><code><pre>
  function hypothesisTesting(operator, valueReference, n, sampleMean, sd, alpha) {
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
    const populationMean = valueReference;
    const z = limitDecimalPoints(((sampleMean - populationMean) / (sd / Math.sqrt(n))), 2);
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
        conclusion = \`At the {alpha * 100}% level of significance, There is enough evidence to reject the claim.\`;
      } else {
        conclusion = \`At the {alpha * 100}% level of significance, There is not enough evidence to reject the claim.\`;
      }
    } else {
      if (rejectNullHypothesis){
        conclusion = \`At the {alpha * 100}% level of significance, There is enough evidence to support the claim.\`;
      } else {
        conclusion = \`At the {alpha * 100}% level of significance, There is not enough evidence to support the claim.\`;
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
  </pre></code></p>`;

  main.append(headerTt, overview, form, container, formula);
}


// ung input
// 