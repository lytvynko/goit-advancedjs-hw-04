import axios from 'axios';

// Paste your key from https://pixabay.com/api/docs/
const API_KEY = '58303341-638c410ebb1bf44bb21757c0a';
const BASE_URL = 'https://pixabay.com/api/';

export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });

  return response.data;
}
