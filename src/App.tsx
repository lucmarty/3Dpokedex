import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Pokemon from "./pages/PokemonPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/:id"
          element={<Pokemon />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
