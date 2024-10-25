const baseUrl = "https://data.culture.gouv.fr/api";
const elements = {
  cinema_list: document.querySelector("#cinema_list tbody")
}

export function tableMapping(coords, range_value) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=within_distance(geolocalisation, geom'POINT(${coords.longitude} ${coords.latitude})', ${range_value}km)&limit=5`)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          elements.cinema_list.innerHTML = data.results.map(cinema => {
            return `<tr><td>${cinema.nom}</td><td>${cinema.adresse}</td></tr>`;
          }).join('');
          resolve(data.results);
        } else {
          throw new Error("Aucun cinéma n'a été trouvé");
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
