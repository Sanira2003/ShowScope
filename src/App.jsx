import "./css/App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: `/`,
    element: (
      <>
        <Home />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
