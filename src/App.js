import { BrowserRouter } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header";
import Home from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import './assets/global.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my_cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
