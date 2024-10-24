import { getAddressFromCoords, getCoordinatesFromPostalCode } from "./javascript/addressApi.js";
import { getUserCoordinates } from "./javascript/geolocation.js";

const user_geolocation = document.querySelector("#user_geolocation");
const target_adress = document.querySelector("#target_adress");
const search = document.querySelector("#search");
const range = document.querySelector("#range");
const range_nbr = document.querySelector(".range_nbr");
const cinema_list = document.querySelector("#cinema_list");

/*RÉCUPERER LE CODE POSTAL AVEC LA GEOLOCALISATION*/
user_geolocation.addEventListener('click', () => {
  getUserCoordinates()
    .then(data => getAddressFromCoords(data))
    .then(properties => {
      target_adress.value = properties.postcode;
    })
    .catch(error => console.log("Erreur : " + error));
});

/*RECHERCHE DES CINEMAS PROCHES*/
search.addEventListener('click', (e) => {
  e.preventDefault();
  const range_value = range.value;
  getCoordinatesFromPostalCode(62500).then(coords => {
    fetch(`https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation, geom'POINT(${coords.longitude} ${coords.latitude})', ${range_value}km)&limit=5`)
      .then(response => response.json()).then(data => {
        cinema_list.innerHTML = data.results.map(cinema => {
          return `<li>nom: ${cinema.nom} | adresse: ${cinema.adresse}</li>`
        }).join('');
      });
  });
})

/*UPDATE DE LA RANGE DE KILOMETRES*/
range.addEventListener('input', () => {
  const range_value = range.value;
  range_nbr.textContent = range_value;
});