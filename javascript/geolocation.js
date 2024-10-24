export function getUserCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          resolve({ latitude, longitude });
        } else {
          reject("Invalid geographic coordinates");
        }
      },
      error => reject(error)
    );
  });
}