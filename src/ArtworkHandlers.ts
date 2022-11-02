export async function getArtwork(id: number) {
  return fetch("https://api.artic.edu/api/v1/artworks/" + id);
}

export function getImageUrl(id: string) {
  return "https://www.artic.edu/iiif/2/" + id + "/full/843,/0/default.jpg";
}

export async function postRating(id: string, rating: number) {
  const options = {
    method: "POST",
    body: JSON.stringify({ id: id, rating: rating }),
  };
  return fetch("https://v0867.mocklab.io/rating", options);
}
