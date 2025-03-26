import { Footer, Navbar } from "./components/Layout";
import { Home, ErrorPage } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
