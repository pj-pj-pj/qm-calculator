/* eslint-disable import/no-cycle */
import { unchild } from './index';
import groupToFreqDistTable from './freq-dist';

const main = document.querySelector('main');
const tableContainer = document.createElement('div');
tableContainer.id = 'frq-dist-u-table';

// 1 - 9 : true
function checkIfNumber(e) {
  const { key } = e;
  if (key >= '0' && key <= '9') {
    return true;
  }
  e.preventDefault();
  return false;
}

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
function displayResults(data, classes) {
  const result = groupToFreqDistTable(data, classes);

  const dataDisplay = document.createElement('p');
  dataDisplay.textContent = 'Data Set (Sorted): ';
  dataDisplay.id = 'data-set-display';
  const sorted = data.sort();
  for (let i = 0; i < sorted.length; i += 1) {
    if (dataDisplay.textContent === 'Data Set (Sorted): ') {
      dataDisplay.textContent += data[i];
    } else {
      dataDisplay.textContent += `, ${data[i]}`;
    }
  }
  const table = document.createElement('table');

  const headerRow = table.insertRow();
  ['Class Interval', 'Class Boundaries', 'Class Mark', 'Class Frequency', 'Relative Frequency'].forEach((header) => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });

  for (let i = 0; i < classes; i += 1) {
    const row = table.insertRow();

    // Formatting Class Interval
    const classIntervalCell = row.insertCell();
    const classInterval = result.classInterval[i];
    classIntervalCell.textContent = `${classInterval.min} - ${classInterval.max}`;

    // Formatting Class Boundaries
    const classBoundariesCell = row.insertCell();
    const classBoundaries = result.classBoundaries[i];
    classBoundariesCell.textContent = `${classBoundaries.min} - ${classBoundaries.max}`;

    // Displaying other data in the table
    ['classMark', 'classFrequency', 'relativeFrequency'].forEach((key) => {
      const cell = row.insertCell();
      cell.textContent = result[key][i];
    });
  }

  tableContainer.append(table, dataDisplay);
}

function frqDistUngrFormInit(form) {
  // data set field
  const datasetLabel = document.createElement('label');
  datasetLabel.textContent = 'Data Set (e.g. 1,2,3):';
  const datasetInput = document.createElement('input');
  datasetInput.type = 'text';
  datasetInput.name = 'dataset';
  datasetInput.placeholder = '1,2,3';
  datasetLabel.appendChild(datasetInput);

  datasetInput.addEventListener('keypress', checkIfNumberOrComma);

  // Number of classes field
  const classesLabel = document.createElement('label');
  classesLabel.textContent = 'Number of Classes:';
  const classesInput = document.createElement('input');
  classesInput.type = 'text';
  classesInput.name = 'numClasses';
  classesInput.placeholder = '1 - 999';
  classesInput.maxLength = '3';
  classesLabel.appendChild(classesInput);
  classesLabel.appendChild(classesInput);

  classesInput.addEventListener('keypress', checkIfNumber);

  // Add 'required' attribute to input fields
  datasetInput.setAttribute('required', true);
  classesInput.setAttribute('required', true);
  // Event listener for form submission

  // submit button
  const submit = document.createElement('button');
  submit.textContent = 'Show Frequency Distribution';
  submit.type = 'submit';

  const warningMsg = document.createElement('p');
  warningMsg.textContent = 'All* fields are required';
  warningMsg.style.display = 'none';
  warningMsg.style.color = 'red';
  warningMsg.style.textAlign = 'center';

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    unchild(tableContainer);

    if ((!datasetInput.value || !classesInput.value)) {
      // display error
      warningMsg.style.display = 'block';
    } else { // undisplay error and display results
      const data = datasetInput.value
        .split(',')
        .filter((value) => value.trim() !== '') // Filter out empty values
        .map(Number);
      const classes = Number(classesInput.value);
      displayResults(data, classes);
      warningMsg.style.display = 'none';

      classesInput.value = '';
      datasetInput.value = '';
    }
  });

  form.append(datasetLabel, classesLabel, submit, warningMsg);
}

export default function fdtuUIinit() {
  const headerTt = document.createElement('h2');
  headerTt.textContent = '# Frequency Distribution Table (Ungrouped)';

  const overview = document.createElement('div');
  overview.innerHTML = '<p>Important characteristics of a large mass of data can be readily assessed by <b>grouping the data into different classes</b> and then determining the number of observations that fall in each of the classes.</p>';
  overview.innerHTML += '<p>Such an arrangement in tabular form is called a frequency distribution</p>';

  const form = document.createElement('form');
  form.id = 'frq-dist-u-form';

  frqDistUngrFormInit(form);

  const formula = document.createElement('div');
  formula.innerHTML = '<h3>✏️ How It Works</h3>';
  formula.innerHTML += '<p>From the data entered, the calculator computes for the <b>class width</b> (range / class number) rounded <i>up</i> to the nearest whole number. <i>(<b>range</b> = min - max)</i></p>';
  formula.innerHTML += 'Using the computed class width, the calculator now computes for the <b>class intervals</b> of the data. Starting with the lowest value in the data set which will be used as base for the lower class interval, the calculator will add a value of (class width - 1) to get the higher class interval. The value of class width will be added to the following class intervals.';
  formula.innerHTML += `<p><code><pre>
  const maxClassInterval = Math.min(...dataSet) + ((classWidth * classNumber) - 1);
  for (let i = Math.min(...dataSet); i <= maxClassInterval; i += classWidth) {
    classInterval.push({ min: i, max: i + (classWidth - 1) });
  }
  </pre></code></p>`;
  formula.innerHTML += 'The calculator proceeds to computing the <b>class boundaries</b> by subtracting 0.5 to the lower value of class intervals and adding 0.5 to the higher value of class intervals.';
  formula.innerHTML += `<p><code><pre>
  classBoundaries = classInterval.map((classInt) => ({
    min: classInt.min - 0.5,
    max: classInt.max + 0.5,
  }));
  </pre></code></p>`;
  formula.innerHTML += '<b>Class mark</b> is computed by adding the lower and higher value of the corresponding interval and dividing them to 2';
  formula.innerHTML += `<p><code><pre>
  classMark = fTable.classInterval.map((classInt) => (classInt.min + classInt.max) / 2);
  </pre></code></p>`;
  formula.innerHTML += 'The calculator computes the <b>frequency</b> of values within each class interval by tallying the number of data points that fall into each interval.';
  formula.innerHTML += `<p><code><pre>
  classFrequency = [];
  for (let i = 0; i < classNumber; i += 1) {
    classFrequency.push(0);
    for (let j = 0; j < dataSet.length; j += 1) {
      if (dataSet[j] >= classInterval[i].min && dataSet[j] <= classInterval[i].max) {
        classFrequency[i] += 1;
      }
    }
  }
  </pre></code></p>`;
  formula.innerHTML += 'The <b>relative frequency</b> for each class interval is calculated by dividing the corresponding class frequency by the total number of data points in the dataset, resulting in a proportional value for each interval. <i>The resulting value that has any fractional part of the number will have a maximum of three decimal places.</i>';
  formula.innerHTML += `<p><code><pre>
  fTable.relativeFrequency = fTable.classFrequency.map((frequency) => (
    Number((frequency / dataSet.length).toFixed(3))
  ));
  </pre></code></p>`;

  main.append(headerTt, overview, form, tableContainer, formula);
}
