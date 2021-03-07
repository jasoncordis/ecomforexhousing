google.maps.event.addDomListener(window, 'load', initPlacesAutoComplete);

function initPlacesAutoComplete() {
  var input = document.getElementById('locationTextField');
  var autocomplete = new google.maps.places.Autocomplete(input);
}
