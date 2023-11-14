/* eslint-disable import/no-cycle */
import { unchild } from './index';
import { calculateSkewness, getSymmetry } from './symmetry-and-skewness';

const main = document.querySelector('main');
const resultContainer = document.createElement('div');

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

function displayResults(datasetInput, populationOrSample) {
  const data = datasetInput.value
    .split(',')
    .filter((value) => value.trim() !== '') // Filter out empty values
    .map(Number);
  const skewness = calculateSkewness(data, populationOrSample);
  const symmetry = getSymmetry(skewness);

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

  const p = document.createElement('p');
  p.textContent = `Result: ${skewness}, ${symmetry}`;
  resultContainer.append(p, dataDisplay);
}

function skewnessFormInit(form) {
  // data set field
  const datasetLabel = document.createElement('label');
  datasetLabel.textContent = 'Data Set (e.g. 1,2,3):';
  const datasetInput = document.createElement('input');
  datasetInput.type = 'text';
  datasetInput.name = 'dataset';
  datasetInput.placeholder = '1,2,3';
  datasetLabel.appendChild(datasetInput);

  datasetInput.addEventListener('keypress', checkIfNumberOrComma);

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
        if (!cb.checked && cb !== event.target) {
          // eslint-disable-next-line no-param-reassign
          cb.checked = true;
        } else if (cb !== event.target) {
          // eslint-disable-next-line no-param-reassign
          cb.checked = false;
        }
      });
    });
  });

  // Event listener for form submission
  const submit = document.createElement('button');
  submit.textContent = 'Show Symmetry and Skewness';
  submit.type = 'submit';

  const warningMsg = document.createElement('p');
  warningMsg.textContent = 'All* fields are required';
  warningMsg.style.display = 'none';
  warningMsg.style.color = 'red';
  warningMsg.style.textAlign = 'center';

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    unchild(resultContainer);

    if (!datasetInput.value) {
      // display error
      warningMsg.style.display = 'block';
    } else { // undisplay error and display results
      warningMsg.style.display = 'none';

      const popOrSample = populationCheckbox.checked ? 'population' : 'sample';
      displayResults(datasetInput, popOrSample);
      datasetInput.value = '';
    }
  });

  form.append(datasetLabel, populationLabel, sampleLabel, submit, warningMsg);
}

export default function skewnessInit() {
  const headerTt = document.createElement('h2');
  headerTt.textContent = '# Symmetry and Skewness';

  const overview = document.createElement('div');
  overview.innerHTML = '<p><b>Symmetric: </b>if distribution can be folded along a vertical axis so that the two sides coincide.</p>';
  overview.innerHTML += '<p><b>Skewed: </b>a distribution that lacks symmetry with respect to vertical axis.</p>';

  const form = document.createElement('form');
  form.id = 'skewness-form';

  skewnessFormInit(form);

  main.append(headerTt, overview, form, resultContainer);
}
