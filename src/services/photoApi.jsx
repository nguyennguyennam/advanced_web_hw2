/*
  This module fetches images from the Lorem Picsum API.
  No API key required.
  Added setTimeout for visual effect simulation.
*/

const API_BASE = "https://picsum.photos/v2/list";

/**
 * Fetch a list of images with pagination
 * @param {number} page - current page number
 * @param {number} limit - number of images per page
 * @returns {Promise<Array>} list of image objects
 */
export async function fetchImages(page = 1, limit = 5) {
  const url = `${API_BASE}?page=${page}&limit=${limit}`;
  
  const [response] = await Promise.all([
    fetch(url),
    new Promise((resolve) => setTimeout(resolve, 3000))
  ]);
  if (!response.ok) {
    throw new Error("Failed to fetch images from Picsum");
  }

  const data = await response.json();
  console.log("FETCHED DATA:", data);
  return data;
}

/**
 * Fetch single image details by ID
 * @param {string | number} id - image ID
 * @returns {Promise<Object>} image metadata
 */
export async function fetchImageById(id) {
  const url = `https://picsum.photos/id/${id}/info`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch image details");
  }

  return await response.json();
}
