import "./css/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieCard from "./components/MovieCard"; 
import movie from "./assets/movie.webp"

const router = createBrowserRouter([
  {
    path: `/`,
    element: (
      <MovieCard
        movie={{
          id: 1,
          title: "sanira",
          poster_path: movie,
          vote_avarage: "2",
          release_date: "2025",
        }}
      />
    ),
  }
]);



function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
