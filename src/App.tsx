import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Pokemon from "./pages/PokemonPage";

const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Pokemon Page */}
        <Route path="/:id" element={<Pokemon />} />
        {/* Team Page */}
        <Route path="/team" element={
          <h1>Team Page</h1>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
