google.maps.event.addDomListener(window, 'load', initPlacesAutoComplete);
addNavbarBurgerFunctionality();

function initPlacesAutoComplete() {
  var input = document.getElementById('locationTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
}

/**
 * Lets the navbar's burger menu actually work.
 */
function addNavbarBurgerFunctionality() {
  document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  });
}

function aboutPage() {
  hideElement('main');
  showElement('about-section');
}

function updateModal(title, primary, image1, image2, image3, image4)
{
  document.querySelector('#modal-card-title').textContent = title;
  document.querySelector('#modal-primary-image').src = primary;
  document.querySelector('#modal-image-1').src = image1;
  document.querySelector('#modal-image-2').src = image2;
  document.querySelector('#modal-image-3').src = image3;
  document.querySelector('#modal-image-4').src = image4;
}

function showHouseDetails(title, primary, image1, image2, image3, image4) {
  updateModal(title, primary, image1, image2, image3, image4);
  showModal();
}
