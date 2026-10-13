import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { EncyclopediaPage } from "./pages/EncyclopediaPage";
import { HomePage } from "./pages/HomePage";
import { MythologyEntryPage } from "./pages/MythologyEntryPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="encyclopedia" element={<EncyclopediaPage />} />
        <Route path="encyclopedia/:id" element={<MythologyEntryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
