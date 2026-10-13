import { AboutPage } from "./pages/AboutPage";
import { EncyclopediaPage } from "./pages/EncyclopediaPage";
import { HomePage } from "./pages/HomePage";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/encyclopedia") return <EncyclopediaPage />;
  if (path === "/about") return <AboutPage />;
  return <HomePage />;
}

export default App;
