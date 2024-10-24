const baseUrl = "https://api-adresse.data.gouv.fr";

export function getAddressFromCoords({ latitude, longitude }) {
  return fetch(`${baseUrl}/reverse/?lon=${longitude}&lat=${latitude}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }
      return response.json();
    })
    .then(data => {
      if (data.features && data.features.length > 0) {
        return data.features[0].properties;
      } else {
        throw new Error("No address found");
      }
    })
    .catch((error) => {
      throw error;
    });
}

export function getCoordinatesFromPostalCode(postalCode) {
  return fetch(`${baseUrl}/search/?q=${postalCode}&type=municipality`)
    .then(response => response.json())
    .then(data => {
      if (data.features.length > 0) {
        const [longitude, latitude] = data.features[0].geometry.coordinates;
        return { latitude, longitude };
      } else {
        throw new Error("Aucune donnée trouvée pour ce code postal");
      }
    })
    .catch(error => error);
}
