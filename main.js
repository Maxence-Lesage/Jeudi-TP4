import { getAddressFromCoords, getCoordinatesFromPostalCode } from "./javascript/addressApi.js";
import { getUserCoordinates } from "./javascript/geolocation.js";
import { tableMapping } from "./javascript/tableMapping.js";
import { waitFor } from "./javascript/utils.js";

const elements = {
  user_geolocation: document.querySelector("#user_geolocation"),
  target_adress: document.querySelector("#target_adress"),
  search: document.querySelector("#search"),
  range: document.querySelector("#range"),
  range_nbr: document.querySelector(".range_nbr"),
  scan_error_message: document.querySelector(".scan_error"),
  geolocalisation_error: document.querySelector(".geolocalisation_error")
}

/*RÉCUPERER LE CODE POSTAL AVEC LA GEOLOCALISATION*/
elements.user_geolocation.addEventListener('click', () => {
  getUserCoordinates()
    .then(data => getAddressFromCoords(data))
    .then(properties => {
      elements.target_adress.value = properties.postcode;
    })
    .catch(error => {
      elements.geolocalisation_error.removeAttribute('hidden');
      elements.geolocalisation_error.textContent = error.message;
      waitFor(5).then(() => {
        elements.geolocalisation_error.setAttribute('hidden', true);
      });
    });
});

/*RECHERCHE DES CINEMAS PROCHES*/
elements.search.addEventListener('click', (e) => {
  e.preventDefault();
  const range_value = elements.range.value;
  const postalCode = elements.target_adress.value;

  if (postalCode) {
    getCoordinatesFromPostalCode(postalCode)
      .then(coords => {
        return tableMapping(coords, range_value);
      })
      .catch(error => {
        elements.scan_error_message.removeAttribute('hidden');
        elements.scan_error_message.textContent = error;
        waitFor(5).then(() => {
          elements.scan_error_message.setAttribute('hidden', true);
        });
      });
  } else {
    elements.scan_error_message.removeAttribute('hidden');
    elements.scan_error_message.textContent = "Veuillez renseigner un code postal";
    waitFor(5).then(() => {
      elements.scan_error_message.setAttribute('hidden', true);
    });
  }
});


/*UPDATE DE LA RANGE DE KILOMETRES*/
elements.range.addEventListener('input', () => {
  const range_value = elements.range.value;
  elements.range_nbr.textContent = range_value;
});