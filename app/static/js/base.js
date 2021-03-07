// addNavbarBurgerFunctionality();

// /**
//  * Lets the navbar's burger menu actually work.
//  */
// function addNavbarBurgerFunctionality() {
//   document.addEventListener('DOMContentLoaded', () => {
//     // Get all "navbar-burger" elements
//     const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
//     // Check if there are any navbar burgers
//     if ($navbarBurgers.length > 0) {
//       // Add a click event on each of them
//       $navbarBurgers.forEach( el => {
//         el.addEventListener('click', () => {
//           // Get the target from the "data-target" attribute
//           const target = el.dataset.target;
//           const $target = document.getElementById(target);
//           // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//           el.classList.toggle('is-active');
//           $target.classList.toggle('is-active');
//         });
//       });
//     }
//   });
// }

/**
 * Returns the nearest ancestor node of the specified element type.
 * @param {object} htmlElementNode Element to get ancestor for
 * @param {string} targetAncestorElementTag Type of element to look for
 */
function getNearestAncestor(htmlElementNode, targetAncestorElementTag) {
  while (htmlElementNode) {
      htmlElementNode = htmlElementNode.parentNode;
      if (htmlElementNode.tagName.toLowerCase() === targetAncestorElementTag) {
          return htmlElementNode;
      }
  }
  return undefined;
}

/**
 * Clears any existing values on the modal inputs.
 */
function clearModalInputValues() {
  const modalInputs = getModalInputs();
  for (let i = 0; i < modalInputs.length; i++) {
    modalInputs[i].value = '';
  }
}

/**
 * Prepopulates the modal with the row's data values.
 * @param {array} ids
 */
function prepopulateModalInputValues(ids) {
  const modalInputs = getModalInputs();
  for (let i = 0, tdId; i < modalInputs.length; i++) {
    tdId = `${modalInputs[i].id}|`;
    for (let j = 0; j < ids.length; j++) {
      tdId += ids[j];
      if (j != ids.length-1) {
        tdId += '|'
      }
    }
    modalInputs[i].value = document.getElementById(tdId).textContent;
  }
}

/**
 * Inserts a new row of data into the table.
 * @param {string} route
 */
function insertRow(route) {
  if (route === '/insert-match-history') {
    document.getElementById('hideforupdate').style.display='block';
  }

  clearModalInputValues();
  showModal('create');

  let saveButton = document.getElementById('saveChanges');

  // This removes previous event listeners
  var saveButtonClone = saveButton.cloneNode(true);
  saveButton.parentNode.replaceChild(saveButtonClone, saveButton);

  saveButtonClone.addEventListener('click', function () { saveChanges(route) }, false);
}

/**
 * Updates data in the row.
 * @param {*} htmlElementNode
 * @param {string} route
 */
function updateRow(htmlElementNode, route) {

  // Returns the row element
  const tr = getNearestAncestor(htmlElementNode, 'tr');

  const info = tr.id.split('|');

  let fields = []
  for (let i = 1, field; i < info.length; i++) {
    field = info[i].split('=');
    fields.push(field);
  }

  rowIds = []
  for (let i = 0; i < fields.length; i++) {
    rowIds.push(fields[i][1]);
  }

  if (route === '/update-match-history') {
    document.getElementById('hideforupdate').style.display='none';
  }

  prepopulateModalInputValues(rowIds);
  showModal('update');

  let saveButton = document.getElementById('saveChanges');

  // This removes previous event listeners
  var saveButtonClone = saveButton.cloneNode(true);
  saveButtonClone.addEventListener('click', function () { saveChanges(route, fields) }, false);
  saveButton.parentNode.replaceChild(saveButtonClone, saveButton);
}

/**
 * Shows the overlay/popup modal.
 * @param {string} actionType Can be either 'create' or 'update'.
 */
function showModal(actionType) {
  let element = document.getElementById('modal');
  element.classList.add('is-active');
  document.getElementsByTagName('body')[0].classList.add('is-clipped');
  if (actionType == 'create') {
    updateModalCardTitle('Create');
  }
  else if (actionType == 'update') {
    updateModalCardTitle('Update');
  }
}

/**
 * Hides the overlay/popup modal.
 */
function hideModal() {
  let element = document.getElementById('modal');
  element.classList.remove('is-active');
  document.getElementsByTagName('body')[0].classList.remove('is-clipped');
}

/**
 * Updates the modal card title with the specified text.
 * @param {string} text The new title for the Modal Card.
 */
function updateModalCardTitle(text) {
  let element = document.getElementById('modal-card-title');
  element.textContent = text;
}

/**
 * Returns an array-like object of all modal input elements.
 */
function getModalInputs() {
  return document.getElementsByClassName('modal-input');
}

/**
 * Submits the input values to the specified route.
 * @param {string} route
 */
function saveChanges(route, id=null) {
  // Create JSON to send to web server.
  modalInputs = getModalInputs();
  let payload = {}

  // Adds a new key for the payload that holds the id's integer
  if (id != null) {
    for (let i = 0; i < id.length; i++) {
      payload[id[i][0]] = id[i][1]
    }
  }

  // Iterate through the inputs and assign the values to a payload['column_name_of_the_HTML_table']
  for (let i = 0; i < modalInputs.length; i++) {
    payload[modalInputs[i].id] = modalInputs[i].value;
  }
  submitForm(route, payload);
}

/**
 * Makes a search on the MatchHistories table.
 * We can probably remove the parameter and have it hardcoded instead.
 * @param {string} route
 */
function search(route) {
  let summoner_name = document.getElementById('search').value;
  payload = {'summoner_name': summoner_name};
  submitForm(route, payload, method='get');
}

/**
 * Submits the form, except with the get method instead.
 * Not sure if this is even used, but leaving it in for now to prevent anything
 * from breaking.
 * @param {string} route
 */
function get(route) {
  submitForm(route, {}, method='get');
}

/**
 * Submits the input to the specified route.
 * @param {string} path Basically the route.
 * @param {object} params
 * @param {string} method
 */
function submitForm(path, params, method='post') {
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}

/**
 * Deletes a row.
 * @param {*} htmlElementNode
 */
async function deleteRow(htmlElementNode) {
  const tr = getNearestAncestor(htmlElementNode, 'tr');
  const info = tr.id.split('|');
  let fields = []
  for (let i = 1, field; i < info.length; i++) {
    field = info[i].split('=');
    fields.push(field);
  }

  // Request a delete in the table from the server.
  await axios.post('/deleteRow', {
     table: info[0],
     identifiers: fields,
  })
  .catch(function (error) {
    console.log(error);
  });
  // Delete from HTML.
  tr.remove();
}

function hideElement(id) {
  document.querySelector(`#${id}`).classList.add('is-hidden');
}

function showElement(id) {
  document.querySelector(`#${id}`).classList.remove('is-hidden');
}

function animateToNextStep(currentId, nextId, animationClass) {
  let currentStep = document.querySelector(`#${currentId}`);
  currentStep.addEventListener('animationend', () => {
    hideElement(currentId);
    showElement(nextId);
  });
  currentStep.classList.add(animationClass);
  currentStep.classList.add('animate__animated');
}
