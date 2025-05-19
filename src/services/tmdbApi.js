const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `b3c7fdf9caa19e248eaaac1d2bbbdba6`;
const IMG_URL = `https://image.tmdb.org/t/p`;

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  const result = await response.json();
  return result;
};

export const getPopulerMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const result = await response.json();
  return result;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const result = await response.json();
  return result;
};

export const getImageUrl = (poster_path, size = "w500") => {
  return `${IMG_URL}/${size}${poster_path}`;
};

export const getMovieById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );
  const result = await response.json();
  return result;
};
