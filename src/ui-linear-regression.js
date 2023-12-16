import { unchild } from './index';
import { linearRegression } from './linear-regression';
const { limitDecimalPoints } = require('./mean-median-mode');

const main = document.querySelector('main');
const tableContainer = document.createElement('div');
tableContainer.id = 'linear-regression-table';

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

function displayResults(x, y, givendata, labels) {
  const linearRegValues = linearRegression(x, y);
  const a = linearRegValues.a;
  const b = linearRegValues.b;
  let sign = Math.sign(b) === 1 ? '+' : Math.sign(b) === -1 ? '-' : '0';
  const mainEquation = `Y = ${a} ${sign} ${b}x`;

  const p = document.createElement('p');
  p.textContent = `Linear Equation: ${mainEquation}`;

  const table = document.createElement('table');

  const headerRow = table.insertRow();
  
  labels.push('xy'); labels.push('x²'); labels.push('y²');
  labels.forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  
  for (let i = 0; i < x.length; i += 1) {
    const row = table.insertRow();

    const xCell = row.insertCell(); xCell.textContent = x[i];
    const yCell = row.insertCell(); yCell.textContent = y[i];
    const xyCell = row.insertCell(); xyCell.textContent = linearRegValues.xyData[i];
    const xSquaredCell = row.insertCell(); xSquaredCell.textContent = linearRegValues.xSquaredData[i];
    const ySquaredCell = row.insertCell(); ySquaredCell.textContent = linearRegValues.ySquaredData[i];
  }

  const row = table.insertRow();
  row.insertCell().textContent = `∑x = ${linearRegValues.summationX}`;
  row.insertCell().textContent = `∑y = ${linearRegValues.summationY}`;
  row.insertCell().textContent = `∑xy = ${linearRegValues.summationXY}`;
  row.insertCell().textContent = `∑x² = ${linearRegValues.summationXSquared}`;
  row.insertCell().textContent = `∑y² = ${linearRegValues.summationYSquared}`;
  
  
  
  const p2 = document.createElement('p');
  p2.textContent = `Predicted Values: `;

  const tablePredValues = document.createElement('table');
  const PredValuesheaderRow = tablePredValues.insertRow();
  
  const xColumn = document.createElement('th');
  xColumn.textContent = labels[0];
  PredValuesheaderRow.appendChild(xColumn);

  const yColumn = document.createElement('th');
  yColumn.textContent = labels[1];
  PredValuesheaderRow.appendChild(yColumn);

  let computedPredictedData = [];
  for (let i = 0; i < givendata.length; i++) {
    computedPredictedData.push(a + (b * givendata[i]));
  }

  for (let i = 0; i < givendata.length; i++) {
    const row = tablePredValues.insertRow();

    const givenDataCell = row.insertCell(); givenDataCell.textContent = givendata[i];
    const predictedDataCell = row.insertCell(); predictedDataCell.textContent = limitDecimalPoints(computedPredictedData[i], 3);
  }

  tableContainer.append(p, table, p2, tablePredValues);
}

function linearRegFormInit(form) {
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

  // Given Value label
  const givenValueLabel = document.createElement('label');
  givenValueLabel.textContent = 'Give value/s of x to predict the corresponding y:';
  givenValueLabel.className = 'data-label';
  const givenValueInput = document.createElement('input');
  givenValueInput.type = 'text';
  givenValueInput.name = 'y-label';
  givenValueInput.placeholder = '1,2,3';
  givenValueLabel.appendChild(givenValueInput);

  // Add 'required' attribute to input fields
  xdatasetInput.setAttribute('required', true);
  ydatasetInput.setAttribute('required', true);
  givenValueInput.setAttribute('required', true);

  // Event listener for form submission
  // submit button
  const submit = document.createElement('button');
  submit.textContent = 'Show Linear Regression Analysis';
  submit.type = 'submit';

  const warningMsg = document.createElement('p');
  warningMsg.textContent = 'All* fields are required';
  warningMsg.style.display = 'none';
  warningMsg.style.color = 'red';
  warningMsg.style.textAlign = 'center';

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    unchild(tableContainer);

    if ((!xdatasetInput.value || !ydatasetInput.value || !givenValueInput.value)) {
      // display error
      warningMsg.style.display = 'block';
    } else { // undisplay error and display results
      let xdata = xdatasetInput.value
        .split(',')
        .filter((value) => value.trim() !== '') // Filter out empty values
      xdata = xdata.map((value) => {
        const parsedValue = Number(value.trim());
        return isNaN(parsedValue) ? value.trim() : parsedValue;
      });
      
      let ydata = ydatasetInput.value
        .split(',')
        .filter((value) => value.trim() !== '') // Filter out empty values
      ydata = ydata.map((value) => {
        const parsedValue = Number(value.trim());
        return isNaN(parsedValue) ? value.trim() : parsedValue;
      });

      let givendata = givenValueInput.value
        .split(',')
        .filter((value) => value.trim() !== '') // Filter out empty values
      givendata = givendata.map((value) => {
        const parsedValue = Number(value.trim());
        return isNaN(parsedValue) ? value.trim() : parsedValue;
      });

      const dataLabels = [xLabelInput.value, yLabelInput.value];
      displayResults(xdata, ydata, givendata, dataLabels);
      warningMsg.style.display = 'none';

    }
  });

  form.append(xLabel, xdatasetLabel, yLabel, ydatasetLabel, givenValueLabel, submit, warningMsg);
}

export default function linearRegUIinit() {
  const headerTt = document.createElement('h2');
  headerTt.textContent = '# Linear Regression';

  const overview = document.createElement('div');
  overview.innerHTML = "<p>Linear regression is a statistical method used to model the relationship between a dependent variable and one or more independent variables by fitting a <b>linear equation</b> to the observed data. The goal is to find the <b>best-fitting line</b> that minimizes the sum of squared differences between the observed values and the values predicted by the model.</p>";
  overview.innerHTML += '<p>In a simple linear regression, there is one dependent variable and one independent variable, and the relationship is represented by the equation: Y = a + bX</p>';

  const form = document.createElement('form');
  form.id = 'linear-regression-form';

  linearRegFormInit(form);

  const formula = document.createElement('div');
  formula.innerHTML = '<h3>✏️ How It Works</h3>';
  formula.innerHTML += '<p>To interpret the linear regression:</p>';
  formula.innerHTML += "The calculator uses a linear regression function which conducts simple linear regression on given arrays of x and y data points. The function calculates the coefficients of the linear regression equation (<i>Y = a + bX</i>) by computing various summations and intermediate results. It employs arrays to store products, squares, and sums during the calculation process. The resulting object returned by the function includes the calculated coefficients (<i>a</i> and <i>b</i>), intermediate arrays, means of x and y, and summations.";
  formula.innerHTML += '<p>Expressed in javascript:</p>';
  formula.innerHTML += `<p><code><pre>
  function linearRegression(xData, yData) {
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
  
    const xMean = limitDecimalPoints(summationX/n,3);
    const yMean = limitDecimalPoints(summationY/n,3);
  
    const b = limitDecimalPoints((summationXY - ((summationX*summationY)/n))/(summationXSquared - ((summationX ** 2)/n)), 3);
    const a = limitDecimalPoints(yMean - (b * xMean), 3);
    return {
      a: a,
      b: b,
      xyData: xyData,
      xSquaredData: xSquaredData,
      ySquaredData: ySquaredData,
      xMean: xMean,
      yMean: yMean,
      summationX: summationX,
      summationY: summationY,
      summationXY: summationXY,
      summationXSquared: summationXSquared,
      summationYSquared: summationYSquared
    };
  }
  </pre></code></p>`;

  main.append(headerTt, overview, form, tableContainer, formula);
}


// ung input
// 