//under construction

import { unchild } from './index';
import { getFinalLabel } from './simple-correlation-coefficient';
import { spearmanRank,  hasDuplicates } from './spearman-rank';

const main = document.querySelector('main');
const tableContainer = document.createElement('div');
tableContainer.id = 'spearman-rank-table';

function checkIfNumberOrLetterOrComma(e) {
  const { key } = e;
  if ((key >= '0' && key <= '9') || (key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z') || key === ',' || key === '.') {
    return true;
  }
  e.preventDefault();
  return false;
}

function displayResults(x, y, labels) {
  console.log(x);
  const spearmanValues = spearmanRank(x, y);
  const spearmanRankValue = spearmanValues.computedValue;
  const spearmanRankLabel = getFinalLabel(spearmanRankValue);

  const p = document.createElement('p');
  p.textContent = `Result: ${spearmanRankValue}, ${spearmanRankLabel}`;

  const table = document.createElement('table');

  const headerRow = table.insertRow();
  const duplicatesChecker = hasDuplicates(x) || hasDuplicates(y);
  if (duplicatesChecker === false){
    labels.push('Rank X'); labels.push('Rank Y'); labels.push('di'); labels.push('di^2');
    labels.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
  } else {
    labels.push('Rank X'); labels.push('Rank Y'); labels.push('Rx-MRx'); labels.push('Ry-MRy'); labels.push('(Rx-MRx)*(Ry-MRy)'); labels.push('(Rx-MRx)^2'); labels.push('(Ry-MRy)^2');
    labels.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
  }
  
  if (duplicatesChecker === false){
    const xRankData = spearmanValues.xRankData; 
    const yRankData = spearmanValues.yRankData;
    const diData = spearmanValues.diData;
    const diSquaredData = spearmanValues.diSquaredData;
    const diSquaredSummation = spearmanValues.diSquaredSummation;
    
    for (let i = 0; i < x.length; i += 1) {
      const row = table.insertRow();
  
      const xCell = row.insertCell(); xCell.textContent = x[i];
      const yCell = row.insertCell(); yCell.textContent = y[i];
      const xRankCell = row.insertCell(); xRankCell.textContent = xRankData[i];
      const yRankCell = row.insertCell(); yRankCell.textContent = yRankData[i];
      const diCell = row.insertCell(); diCell.textContent = diData[i];
      const diSquaredCell = row.insertCell(); diSquaredCell.textContent = diSquaredData[i];
    }
  } else {
    const xRankData = spearmanValues.xRankData; 
    const yRankData = spearmanValues.yRankData;
    const MRx = spearmanValues.MRx;
    const MRy = spearmanValues.MRy;
    const RxMinusMrxData = spearmanValues.RxMinusMrxData;
    const RyMinusMryData = spearmanValues.RyMinusMryData;
    const ProductData = spearmanValues.ProductData;
    const RxMinusMRxRaiseTo2Data = spearmanValues.RxMinusMRxRaiseTo2Data;
    const RyMinusMRyRaiseTo2Data = spearmanValues.RyMinusMRyRaiseTo2Data;
    const SummationOfProductData = spearmanValues.SummationOfProductData;
    const SummationOfRxMinusMRxRaiseTo2Data = spearmanValues.SummationOfRxMinusMRxRaiseTo2Data;
    const SummationOfRyMinusMRyRaiseTo2Data = spearmanValues.SummationOfRyMinusMRyRaiseTo2Data;
    
    for (let i = 0; i < x.length; i += 1) {
      const row = table.insertRow();
  
      const xCell = row.insertCell(); xCell.textContent = x[i];
      const yCell = row.insertCell(); yCell.textContent = y[i];
      const xRankCell = row.insertCell(); xRankCell.textContent = xRankData[i];
      const yRankCell = row.insertCell(); yRankCell.textContent = yRankData[i];
      const RxMinusMrxCell = row.insertCell(); RxMinusMrxCell.textContent = RxMinusMrxData[i];
      const RyMinusMryCell = row.insertCell(); RyMinusMryCell.textContent = RyMinusMryData[i];
      const ProductCell = row.insertCell(); ProductCell.textContent = ProductData[i];
      const RxMinusMRxRaiseTo2Cell = row.insertCell(); RxMinusMRxRaiseTo2Cell.textContent = RxMinusMRxRaiseTo2Data[i];
      const RyMinusMRyRaiseTo2Cell = row.insertCell(); RyMinusMRyRaiseTo2Cell.textContent = RyMinusMRyRaiseTo2Data[i];
    }
  }
  
  tableContainer.append(p, table);
}

function spearmanFormInit(form) {
  // x-data set field
  const xdatasetLabel = document.createElement('label');
  xdatasetLabel.textContent = 'X Data Set (e.g. 1,2,3):';
  const xdatasetInput = document.createElement('input');
  xdatasetInput.type = 'text';
  xdatasetInput.name = 'dataset';
  xdatasetInput.placeholder = '1,2,3';
  xdatasetLabel.appendChild(xdatasetInput);

  xdatasetInput.addEventListener('keypress', checkIfNumberOrLetterOrComma);

  // y-data set field
  const ydatasetLabel = document.createElement('label');
  ydatasetLabel.textContent = 'Y Data Set (e.g. 1,2,3):';
  const ydatasetInput = document.createElement('input');
  ydatasetInput.type = 'text';
  ydatasetInput.name = 'dataset';
  ydatasetInput.placeholder = '1,2,3';
  ydatasetLabel.appendChild(ydatasetInput);

  ydatasetInput.addEventListener('keypress', checkIfNumberOrLetterOrComma);

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
  submit.textContent = 'Show Spearman Rank Correlation Coefficient';
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

export default function spearmanUIinit() {
  const headerTt = document.createElement('h2');
  headerTt.textContent = '# Spearman Rank Correlation Coefficient';

  const overview = document.createElement('div');
  overview.innerHTML = "<p>The Spearman rank correlation coefficient, is a statistical measure that assesses the strength and direction of the <b>monotonic relationship</b> between two variables. It is a non-parametric measure, meaning it doesn't rely on the distribution of the data, making it suitable for both <b>continuous</b> and <b>ordinal data.</b>";
  overview.innerHTML += '<p>It measures the nature and strength between two variables of the quantitative type</p>';
  overview.innerHTML += '<p><i>Note: when inserting ordinal data (not a number but a label), type them in order, (for example: University,Secondary,Preparatory,Nursery,Illiterate) and type the corresponding value for each of the values on the second variable input (Y Data Set)</i></p>';

  const form = document.createElement('form');
  form.id = 'spearman-rank-form';

  spearmanFormInit(form);

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

  formula.innerHTML += '<p>To rank the data:</p>';
  formula.innerHTML += '<p>This function rank is designed to assign ranks to an array of data points, with a distinction made between cases where the data contains duplicates and where it does not. The function first creates an array of objects, each containing the original value and its index. Depending on whether the data is composed of strings or numerical values, it either maintains the original order for strings or sorts the array in descending order for numerical values. When duplicates are present, the function calculates average ranks for sets of identical values and assigns these ranks to all occurrences. The function then maps the calculated ranks back to the original order of the data using the stored indices, providing a final array of ranked data. This approach ensures accurate ranking, making the function suitable for scenarios where the presence of duplicate values needs to be appropriately considered.</p>';
  formula.innerHTML += '<p>Expressed in javascript:</p>';
  formula.innerHTML += `<p><code><pre>
  function rank(data) {
    let dataObjects = [];
    for (let i = 0; i < data.length; i++) {
      dataObjects.push({value: data[i], index: i});
    }
  
    let rankData = [];
    let mainSortedData = [];
    if (typeof data[0] === 'string'){
      mainSortedData = dataObjects;
    } else {
      mainSortedData = [...dataObjects].sort((a, b) => b.value - a.value);
    }
    //inserted two dumies para hindi sya malito sa variable i.
    mainSortedData.push({value: undefined, index: undefined});
    mainSortedData.push({value: undefined, index: undefined});
    const dataArray = [], duplicateRank = []; 
    
    for (let i = 0; i < data.length; i++) {
      if (mainSortedData[i].value === mainSortedData[i+1].value){
        let duplicate = mainSortedData[i].value;
        duplicateRank.push(i + 1);
        for (let j = i + 1; j < data.length; j++) {
          if (duplicate === mainSortedData[j].value) {
            duplicateRank.push(j + 1);
          }
        }
  
        i += duplicateRank.length;
      }
      
  
      if (duplicateRank.length > 0){
        const sum = duplicateRank.reduce((acc, val) => acc + val, 0);
        const n = duplicateRank.length;
        let average = sum/n;
  
        for (let i = 0; i < duplicateRank.length; i++) {
          duplicateRank[i] = average;
        }
  
        const len = duplicateRank.length;
  
        for (let i = 0; i < len; i++) {
          rankData.push(duplicateRank.pop());
        }
      }
  
  
      if (mainSortedData[i].value !== mainSortedData[i+1].value && i < data.length) {
        rankData.push(i + 1);
        dataArray.push(mainSortedData[i].value);
      } else if (mainSortedData[i].value === mainSortedData[i+1].value) {
        i--;
      }
    }
    
    let rankedData = [];
    for (let h = 0; h < data.length; h++) {
      rankedData[mainSortedData[h].index] = rankData[h];
    }
    return rankedData;
  }
  </pre></code></p>`;

  formula.innerHTML += '<p>To calculate the spearman rank correlation coefficient:</p>';
  formula.innerHTML += 'The provided JavaScript function calculates the Spearman rank correlation coefficient for two sets of data points, considering the presence of duplicates. In the absence of duplicates, it ranks the data, computes differences between corresponding ranks, and applies the Spearman formula to obtain the correlation coefficient. Additional information, including ranked data, differences, and squared differences, is returned. In the presence of duplicates, the function calculates mean ranks and performs modified Spearman calculations, returning a variety of intermediate results such as mean ranks, differences from mean ranks, and products of differences. The function limits the computed Spearman rank to three decimal places and provides a comprehensive set of outputs for both scenarios to aid in result interpretation and debugging.';
  formula.innerHTML += '<p>Expressed in javascript:</p>';
  formula.innerHTML += `<p><code><pre>
  function spearmanRank(xData, yData) {
    const duplicatesChecker = hasDuplicates(xData) || hasDuplicates(yData);
  
    const n = xData.length;
    if (duplicatesChecker === false){
      const xRankData = rank(xData); const yRankData = rank(yData); const diData = [];
  
      for (let i = 0; i < n; i += 1) {
        diData[i] = xRankData[i] - yRankData[i];
      }
      const diSquaredData = diData.map((num) => num ** 2);
      const diSquaredSummation = diSquaredData.reduce((acc, val) => acc + val, 0);
      const spearmanRank = 1 - ((6 * diSquaredSummation) / (n * ((n ** 2) - 1)));
  
      return {
        computedValue: limitDecimalPoints(spearmanRank, 3), 
        xRankData: xRankData, 
        yRankData: yRankData,
        diData: diData,
        diSquaredData: diSquaredData,
        diSquaredSummation: diSquaredSummation,
      };
    } else {
      const xRankData = rank(xData); const yRankData = rank(yData);
      const MRx = xRankData.reduce((acc, val) => acc + val, 0) / n;
      const MRy = yRankData.reduce((acc, val) => acc + val, 0) / n;
      let RxMinusMrxData = []; RyMinusMryData = []; ProductData = []; RxMinusMRxRaiseTo2Data = []; RyMinusMRyRaiseTo2Data = [];
      for (let i = 0; i < n; i++) {
        RxMinusMrxData[i] = xRankData[i] - MRx;
        RyMinusMryData[i] = yRankData[i] - MRy;
        ProductData[i] = RxMinusMrxData[i] * RyMinusMryData[i];
        RxMinusMRxRaiseTo2Data[i] = RxMinusMrxData[i] ** 2;
        RyMinusMRyRaiseTo2Data[i] = RyMinusMryData[i] ** 2;
      }
  
      const SummationOfProductData = ProductData.reduce((acc, val) => acc + val, 0);
      const SummationOfRxMinusMRxRaiseTo2Data = RxMinusMRxRaiseTo2Data.reduce((acc, val) => acc + val, 0);
      const SummationOfRyMinusMRyRaiseTo2Data = RyMinusMRyRaiseTo2Data.reduce((acc, val) => acc + val, 0);
  
      const spearmanRank = SummationOfProductData / (Math.sqrt(SummationOfRxMinusMRxRaiseTo2Data * SummationOfRyMinusMRyRaiseTo2Data))
  
      return {
        computedValue: limitDecimalPoints(spearmanRank, 3), 
        xRankData: xRankData, 
        yRankData: yRankData,
        MRx: MRx,
        MRy: MRy,
        RxMinusMrxData: RxMinusMrxData,
        RyMinusMryData: RyMinusMryData,
        ProductData: ProductData,
        RxMinusMRxRaiseTo2Data: RxMinusMRxRaiseTo2Data,
        RyMinusMRyRaiseTo2Data: RyMinusMRyRaiseTo2Data,
        SummationOfProductData: SummationOfProductData,
        SummationOfRxMinusMRxRaiseTo2Data: SummationOfRxMinusMRxRaiseTo2Data,
        SummationOfRyMinusMRyRaiseTo2Data: SummationOfRyMinusMRyRaiseTo2Data
      };
    }
  }
  </pre></code></p>`;

  main.append(headerTt, overview, form, tableContainer, formula);
}


// ung input
// 