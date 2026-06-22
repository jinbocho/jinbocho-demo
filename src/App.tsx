import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n";
import { ToastProvider } from "./store/ToastContext";
import { DataProvider } from "./store/DataContext";
import { AuthProvider } from "./store/AuthContext";
import { ThemeProvider } from "./store/ThemeContext";
import { RequireAuth, RequireRole } from "./store/guards";
import { AppShell } from "./components/layout/AppShell";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CatalogPage } from "./pages/CatalogPage";
import { BookDetailPage } from "./pages/BookDetailPage";
import { AddBookPage } from "./pages/books/AddBookPage";
import { ShelfAddPage } from "./pages/books/ShelfAddPage";
import { LocationsPage } from "./pages/LocationsPage";
import { BookcaseMapPage } from "./pages/BookcaseMapPage";
import { LoansPage } from "./pages/LoansPage";
import { StatsPage } from "./pages/StatsPage";
import { StatsBookListPage } from "./pages/stats/StatsBookListPage";
import { UsersPage } from "./pages/users/UsersPage";
import { SettingsPage } from "./pages/settings/SettingsPage";

function ProtectedShell({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <AppShell>{children}</AppShell>
    </RequireAuth>
  );
}

export function App() {
  return (
    <ToastProvider>
      <DataProvider>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <BrowserRouter basename="/jinbocho-demo">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  <Route path="/" element={<ProtectedShell><DashboardPage /></ProtectedShell>} />
                  <Route path="/catalog" element={<ProtectedShell><CatalogPage /></ProtectedShell>} />
                  <Route
                    path="/catalog/add"
                    element={<ProtectedShell><RequireRole roles={["admin", "editor"]}><AddBookPage /></RequireRole></ProtectedShell>}
                  />
                  <Route
                    path="/catalog/add/shelf"
                    element={<ProtectedShell><RequireRole roles={["admin", "editor"]}><ShelfAddPage /></RequireRole></ProtectedShell>}
                  />
                  <Route path="/books/:id" element={<ProtectedShell><BookDetailPage /></ProtectedShell>} />
                  <Route path="/locations" element={<ProtectedShell><LocationsPage /></ProtectedShell>} />
                  <Route path="/map/:bookcaseId" element={<ProtectedShell><BookcaseMapPage /></ProtectedShell>} />
                  <Route path="/loans" element={<ProtectedShell><LoansPage /></ProtectedShell>} />
                  <Route path="/stats" element={<ProtectedShell><StatsPage /></ProtectedShell>} />
                  <Route path="/stats/books" element={<ProtectedShell><StatsBookListPage /></ProtectedShell>} />
                  <Route
                    path="/users"
                    element={<ProtectedShell><RequireRole roles={["admin"]}><UsersPage /></RequireRole></ProtectedShell>}
                  />
                  <Route path="/settings" element={<ProtectedShell><SettingsPage /></ProtectedShell>} />
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </DataProvider>
    </ToastProvider>
  );
}
