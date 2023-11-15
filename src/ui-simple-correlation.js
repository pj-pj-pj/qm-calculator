/* eslint-disable import/no-cycle */
import { unchild } from './index';
import { calculateSimpleCorrelation, getFinalLabel } from './simple-correlation-coefficient';

const main = document.querySelector('main');
const tableContainer = document.createElement('div');
tableContainer.id = 'simple-corre-table';

// 0 - 9 and comma(,) and point(.)  : true
// point can be entered multiple times ;-; (i leave it to user's hands)
function checkIfNumberOrComma(e) {
  const { key } = e;
  if ((key >= '0' && key <= '9') || key === ',' || key === '.') {
    return true;
  }
  e.preventDefault();
  return false;
}

// population or sample will be used another day (for variance)
function displayResults(x, y, labels) {
  const correlation = calculateSimpleCorrelation(x, y);
  const correlationLabel = getFinalLabel(correlation);
  const p = document.createElement('p');
  p.textContent = `Result: ${correlation}, ${correlationLabel}`;

  const table = document.createElement('table');

  const headerRow = table.insertRow();
  labels.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  for (let i = 0; i < x.length; i += 1) {
    const row = table.insertRow();

    // x
    const xCell = row.insertCell();
    xCell.textContent = x[i];

    // y
    const yCell = row.insertCell();
    yCell.textContent = y[i];
  }

  tableContainer.append(p, table);
}

function frqDistUngrFormInit(form) {
  // x-data set field
  const xdatasetLabel = document.createElement('label');
  xdatasetLabel.textContent = 'X Data Set (e.g. 1,2,3):';
  const xdatasetInput = document.createElement('input');
  xdatasetInput.type = 'text';
  xdatasetInput.name = 'dataset';
  xdatasetInput.placeholder = '1,2,3';
  xdatasetLabel.appendChild(xdatasetInput);

  xdatasetInput.addEventListener('keypress', checkIfNumberOrComma);

  // y-data set field
  const ydatasetLabel = document.createElement('label');
  ydatasetLabel.textContent = 'Y Data Set (e.g. 1,2,3):';
  const ydatasetInput = document.createElement('input');
  ydatasetInput.type = 'text';
  ydatasetInput.name = 'dataset';
  ydatasetInput.placeholder = '1,2,3';
  ydatasetLabel.appendChild(ydatasetInput);

  ydatasetInput.addEventListener('keypress', checkIfNumberOrComma);

  // x label
  const xLabel = document.createElement('label');
  xLabel.textContent = 'X Label:';
  xLabel.className = 'data-label';
  const xLabelInput = document.createElement('input');
  xLabelInput.type = 'text';
  xLabelInput.name = 'x-label';
  xLabelInput.value = 'X';
  xLabel.appendChild(xLabelInput);

  // y label
  const yLabel = document.createElement('label');
  yLabel.textContent = 'Y Label:';
  yLabel.className = 'data-label';
  const yLabelInput = document.createElement('input');
  yLabelInput.type = 'text';
  yLabelInput.name = 'y-label';
  yLabelInput.value = 'Y';
  yLabel.appendChild(yLabelInput);

  // Add 'required' attribute to input fields
  xdatasetInput.setAttribute('required', true);
  ydatasetInput.setAttribute('required', true);

  // Event listener for form submission
  // submit button
  const submit = document.createElement('button');
  submit.textContent = 'Show Simple Correlation Coefficient';
  submit.type = 'submit';

  const warningMsg = document.createElement('p');
  warningMsg.textContent = 'All* fields are required';
  warningMsg.style.display = 'none';
  warningMsg.style.color = 'red';
  warningMsg.style.textAlign = 'center';

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    unchild(tableContainer);

    if ((!xdatasetInput.value || !ydatasetInput.value)) {
      // display error
      warningMsg.style.display = 'block';
    } else { // undisplay error and display results
      const xdata = xdatasetInput.value
        .split(',')
        .filter((value) => value.trim() !== '') // Filter out empty values
        .map(Number);
      const ydata = ydatasetInput.value
        .split(',')
        .filter((value) => value.trim() !== '') // Filter out empty values
        .map(Number);
      const dataLabels = [xLabelInput.value, yLabelInput.value];
      displayResults(xdata, ydata, dataLabels);
      warningMsg.style.display = 'none';

      xdatasetInput.value = '';
      ydatasetInput.value = '';
      xLabelInput.value = 'X';
      yLabelInput.value = 'Y';
    }
  });

  form.append(xLabel, xdatasetLabel, yLabel, ydatasetLabel, submit, warningMsg);
}

export default function simpCorreUIinit() {
  const headerTt = document.createElement('h2');
  headerTt.textContent = '# Simple Correlation Coefficient';

  const overview = document.createElement('div');
  overview.innerHTML = "<p>It is also called as <b>Pearson's correlation</b> or <b>Product moment correlation coefficient</b></p>";
  overview.innerHTML += '<p>It measures the nature and strength between two variables of the quantitative type</p>';

  const form = document.createElement('form');
  form.id = 'simple-corre-form';

  frqDistUngrFormInit(form);

  const formula = document.createElement('div');
  formula.innerHTML = '<h3>✏️ How It Works</h3>';
  formula.innerHTML += '<p>To interpret the correlation coefficient:</p>';
  formula.innerHTML += "The calculator uses a labeling function that categorizes the coefficient based on its value. A coefficient of 0 is labeled 'no relation,' while a coefficient of 1 or -1 indicates a 'perfect correlation.' For other coefficients, the label reflects both the nature (positive or negative) and strength (weak, moderate, strong) of the correlation.";
  formula.innerHTML += '<p>Expressed in javascript:</p>';
  formula.innerHTML += `<p><code><pre>
  function getFinalLabel(value) {
    if (value === 0) return 'no relation';
    if (value === 1 || value === -1) return 'perfect correlation';
    return 'getNature(value) getStrength(value) correlation';
  }
  </pre></code></p>`;

  formula.innerHTML += '<p>To calculate the correlation coefficient:</p>';
  formula.innerHTML += 'The correlation calculation involves various steps, including obtaining sums, products, and squared values of data points from two datasets. The size of the datasets (n) is considered. Applying the Pearson correlation formula, which involves covariance and standard deviations, yields the correlation coefficient. The final result is limited to three decimal points.';
  formula.innerHTML += '<p>Expressed in javascript:</p>';
  formula.innerHTML += `<p><code><pre>
  function calculateSimpleCorrelation(xData, yData) {
    const summationX = xData.reduce((acc, val) => acc + val, 0);
    const summationY = yData.reduce((acc, val) => acc + val, 0);
  
    const xyData = []; const xSquaredData = []; const
      ySquaredData = [];
    for (let i = 0; i < xData.length; i += 1) {
      xyData[i] = xData[i] * yData[i];
      xSquaredData[i] = xData[i] ** 2;
      ySquaredData[i] = yData[i] ** 2;
    }
  
    const summationXY = xyData.reduce((acc, val) => acc + val, 0);
    const summationXSquared = xSquaredData.reduce((acc, val) => acc + val, 0);
    const summationYSquared = ySquaredData.reduce((acc, val) => acc + val, 0);
    const n = xData.length;
  
    const xSquaredDividedByN = summationX ** 2 / n;
    const ySquaredDividedByN = summationY ** 2 / n;
  
    const denominator = Math.sqrt(
      (summationXSquared - xSquaredDividedByN) * (summationYSquared - ySquaredDividedByN),
    );
    const numerator = summationXY - ((summationX * summationY) / n);
    const simpleCorrelation = numerator / denominator;
    return limitDecimalPoints(simpleCorrelation, 3);
  }
  </pre></code></p>`;

  main.append(headerTt, overview, form, tableContainer, formula);
}
