import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favourite from "./pages/Favourite";
import { UserdataProvider } from "./contexts/UserdataContext";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import Movie from "./pages/Movie";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserdataProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorite" element={<Favourite />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies/:id" element={<Movie />} />
          </Routes>
        </UserdataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
