import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getTheme } from "./constants/themes";
import useMyTheme from "./Store/useMyTheme";
import AppLayout from "./pages/Applayout/AppLayout";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import OverviewPage from "./pages/overview/OverviewPage";
import TourDetailsPage from "./pages/TourDetails/TourDetailsPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ToggleThemeBtn from "./components/ToggleThemeBtn/ToggleThemeBtn";
function App() {
  const queryClient = new QueryClient();
  const darkMode = useMyTheme((state) => state.darkMode);
  const theme = getTheme(darkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <ToggleThemeBtn />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to={"home"} replace />} />
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route
                path="overview"
                element={
                  <ProtectedRoute>
                    <OverviewPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tour/:id"
                element={
                  <ProtectedRoute>
                    <TourDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgotPassword" element={<ForgotPasswordPage />} />
              <Route path="resetPassword" element={<ResetPassword />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
