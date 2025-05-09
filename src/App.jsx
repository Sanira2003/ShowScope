import "./css/App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import movie from "./assets/movie.webp";

const router = createBrowserRouter([
  {
    path: `/`,
    element: (
      <MovieCard
        movie={{
          id: 1,
          title: "Sanira Deneth Adesha",
          poster_path: movie,
          vote_avarage: "2",
          release_date: "2025",
        }}
      />
    ),
  },
]);

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </>
  );
}

export default App;
