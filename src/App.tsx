import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { CatalogPage } from "./pages/CatalogPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { LocationsPage } from "./pages/LocationsPage";
import { BookcaseMapPage } from "./pages/BookcaseMapPage";
import { LoansPage } from "./pages/LoansPage";
import { StatsPage } from "./pages/StatsPage";

export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/jinbocho-demo">
        <AppShell>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/map/:bookcaseId" element={<BookcaseMapPage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </LanguageProvider>
  );
}
