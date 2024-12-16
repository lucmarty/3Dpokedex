import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Header />      
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
