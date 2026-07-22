import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ShelfScanPage } from "./pages/books/ShelfScanPage";
import { ShelfAuditPage } from "./pages/books/ShelfAuditPage";
import { LocationsPage } from "./pages/LocationsPage";
import { BookcaseMapPage } from "./pages/BookcaseMapPage";
import { LoansPage } from "./pages/LoansPage";
import { WishlistPage } from "./pages/wishlist/WishlistPage";
import { AddWishlistPage } from "./pages/wishlist/AddWishlistPage";
import { StatsPage } from "./pages/StatsPage";
import { StatsBookListPage } from "./pages/stats/StatsBookListPage";
import { UsersPage } from "./pages/users/UsersPage";
import { MemberProfilePage } from "./pages/users/MemberProfilePage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { PrivacyPolicyPage } from "./pages/legal/PrivacyPolicyPage";
import { TermsPage } from "./pages/legal/TermsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ParentKidsDashboardPage } from "./pages/kids/ParentKidsDashboardPage";
import { MyReadingPage } from "./pages/kids/MyReadingPage";
import { BookClubPage } from "./pages/bookclub/BookClubPage";
import { CycleDetailPage } from "./pages/bookclub/CycleDetailPage";
import { ProposalsPage } from "./pages/bookclub/ProposalsPage";
import { useAuth } from "./store/AuthContext";

function ProtectedShell({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <AppShell>{children}</AppShell>
    </RequireAuth>
  );
}

// A child account's home is their own reading page, not the catalog
// dashboard — mirrors the real app's role-based landing behaviour.
function HomeOrMyReading() {
  const { hasRole } = useAuth();
  if (hasRole("child")) return <Navigate to="/kids/my-reading" replace />;
  return <DashboardPage />;
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
                  <Route path="/legal/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/legal/terms" element={<TermsPage />} />

                  <Route path="/" element={<ProtectedShell><HomeOrMyReading /></ProtectedShell>} />
                  <Route
                    path="/kids"
                    element={<ProtectedShell><RequireRole roles={["admin", "editor"]}><ParentKidsDashboardPage /></RequireRole></ProtectedShell>}
                  />
                  <Route path="/kids/my-reading" element={<ProtectedShell><MyReadingPage /></ProtectedShell>} />
                  <Route path="/books" element={<ProtectedShell><CatalogPage /></ProtectedShell>} />
                  <Route
                    path="/books/add"
                    element={<ProtectedShell><RequireRole roles={["admin", "editor"]}><AddBookPage /></RequireRole></ProtectedShell>}
                  />
                  <Route
                    path="/books/add/shelf"
                    element={<ProtectedShell><RequireRole roles={["admin", "editor"]}><ShelfAddPage /></RequireRole></ProtectedShell>}
                  />
                  <Route
                    path="/books/add/shelf-scan"
                    element={<ProtectedShell><RequireRole roles={["admin", "editor"]}><ShelfScanPage /></RequireRole></ProtectedShell>}
                  />
                  <Route
                    path="/books/audit/shelf"
                    element={<ProtectedShell><RequireRole roles={["admin", "editor"]}><ShelfAuditPage /></RequireRole></ProtectedShell>}
                  />
                  <Route path="/books/:id" element={<ProtectedShell><BookDetailPage /></ProtectedShell>} />
                  <Route path="/locations" element={<ProtectedShell><LocationsPage /></ProtectedShell>} />
                  <Route path="/map/:bookcaseId" element={<ProtectedShell><BookcaseMapPage /></ProtectedShell>} />
                  <Route path="/loans" element={<ProtectedShell><LoansPage /></ProtectedShell>} />
                  <Route path="/wishlist" element={<ProtectedShell><WishlistPage /></ProtectedShell>} />
                  <Route path="/wishlist/add" element={<ProtectedShell><AddWishlistPage /></ProtectedShell>} />
                  <Route path="/stats" element={<ProtectedShell><StatsPage /></ProtectedShell>} />
                  <Route path="/stats/books" element={<ProtectedShell><StatsBookListPage /></ProtectedShell>} />
                  <Route path="/book-club" element={<ProtectedShell><BookClubPage /></ProtectedShell>} />
                  <Route path="/book-club/proposals" element={<ProtectedShell><ProposalsPage /></ProtectedShell>} />
                  <Route path="/book-club/:id" element={<ProtectedShell><CycleDetailPage /></ProtectedShell>} />
                  <Route
                    path="/users"
                    element={<ProtectedShell><RequireRole roles={["admin"]}><UsersPage /></RequireRole></ProtectedShell>}
                  />
                  <Route path="/users/:userId" element={<ProtectedShell><MemberProfilePage /></ProtectedShell>} />
                  <Route path="/settings" element={<ProtectedShell><SettingsPage /></ProtectedShell>} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </DataProvider>
    </ToastProvider>
  );
}
