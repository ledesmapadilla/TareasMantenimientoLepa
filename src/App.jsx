import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Inicio from "./components/pages/Inicio";
import DistribucionTareas from "./components/pages/DistribucionTareas";
import Zamorano from "./components/pages/Zamorano";
import Nelson from "./components/pages/Nelson";
import Mauricio from "./components/pages/Mauricio";
import Usuarios from "./components/pages/Usuarios";
import Error404 from "./components/pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/distribucion" element={<DistribucionTareas />} />
          <Route path="/zamorano" element={<Zamorano />} />
          <Route path="/nelson" element={<Nelson />} />
          <Route path="/mauricio" element={<Mauricio />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
