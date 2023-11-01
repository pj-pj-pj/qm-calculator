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
function displayResults(data, classes, populationOrSample) {
  const result = groupToFreqDistTable(data, classes);

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

  tableContainer.appendChild(table);
  main.appendChild(tableContainer);
}

function frqDistUngrFormInit(form) {
  // data set field
  const datasetLabel = document.createElement('label');
  datasetLabel.textContent = 'Data Set (e.g., 1,2,3):';
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

  // Checkbox for population
  const populationLabel = document.createElement('label');
  const populationCheckbox = document.createElement('input');
  populationCheckbox.type = 'checkbox';
  populationCheckbox.name = 'population';
  populationCheckbox.checked = true; // Set as default
  populationLabel.appendChild(populationCheckbox);
  populationLabel.appendChild(document.createTextNode(' Population'));

  // Checkbox for sample
  const sampleLabel = document.createElement('label');
  const sampleCheckbox = document.createElement('input');
  sampleCheckbox.type = 'checkbox';
  sampleCheckbox.name = 'sample';
  sampleLabel.appendChild(sampleCheckbox);
  sampleLabel.appendChild(document.createTextNode(' Sample')); // so labels appear after the checkbox

  // Event listener to allow only one checkbox to be checked
  const checkboxes = [populationCheckbox, sampleCheckbox];
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      checkboxes.forEach((cb) => {
        if (cb !== event.target) {
          // eslint-disable-next-line no-param-reassign
          cb.checked = false;
        }
      });
    });
  });

  // Add 'required' attribute to input fields and checkboxes
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
    // display error
    e.preventDefault();
    unchild(tableContainer);

    if ((!datasetInput.value || !classesInput.value)
    && (!populationCheckbox.checked || !sampleCheckbox.checked)) {
      warningMsg.style.display = 'block';
    } else { // undisplay error and display results
      const data = datasetInput.value.split(',').map(Number);
      const classes = Number(classesInput.value);
      displayResults(data, classes, populationCheckbox.checked);
      warningMsg.style.display = 'none';
    }
  });

  form.append(datasetLabel, classesLabel, populationLabel, sampleLabel, submit, warningMsg);
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

  main.append(headerTt, overview, form);
}
