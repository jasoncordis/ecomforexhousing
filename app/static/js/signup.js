google.maps.event.addDomListener(window, 'load', initPlacesAutoComplete);
let coordinates;

function initPlacesAutoComplete() {
  var input = document.getElementById('locationTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    coordinates = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    console.log(coordinates);
    console.log(typeof(coordinates.lat) + '\n' + typeof(coordinates.lng));
  });
}

function updateProgressBar(value) {
  const progressBar = document.querySelector('#progress')
  progressBar.value = `${value}`;
  progressBar.textContent = `${value}%`;
}

function finishStep1() {
  event.preventDefault();
  if (
    document.querySelector('#agereq').checked &&
    document.querySelector('#tosaccept').checked
  ) {
    animateToNextStep('step1', 'step2', 'animate__backOutRight');
    updateProgressBar('25');
  }
}

function finishStep2() {
  event.preventDefault();
  animateToNextStep('step2', 'step3', 'animate__backOutRight');
  updateProgressBar('50');
}

function finishStep3() {
  event.preventDefault();
  animateToNextStep('step3', 'step4', 'animate__backOutRight');
  updateProgressBar('75');
  finishStep4();  // didn't implement the neighborhood selection
}

function finishStep4() {
  window.setTimeout(
    function () {
      updateProgressBar('100');
      document.querySelector('#progressbartext').textContent = "you made it!";
      window.setTimeout(
        function () {
          // Go to main.
          window.location.href = `/main?lat=${coordinates.lat}&lng=${coordinates.lng}`;
        },
        2000
      );
    },
    3000
  );  // fake load times
}
