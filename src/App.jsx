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
import ProfileLayout from "./pages/ProfileLayout/ProfileLayout";
import EditForm from "./components/EditForm/EditForm";
import ChangePassForm from "./components/ChangePassForm/ChangePassForm";
import ToggleThemeBtn from "./components/ToggleThemeBtn/ToggleThemeBtn";
import RoleProtectedRoute from "./pages/RoleProtectedRoute/RoleProtectedRoute";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";
import ToursDash from "./pages/Dashboard/ToursDash";
import UsersDash from "./pages/Dashboard/UsersDash";
import ReviewsDash from "./pages/Dashboard/ReviewsDash";
import AddTour from "./pages/Dashboard/AddTour";
import EditTour from "./pages/Dashboard/EditTour";
import DashboardNotFound from "./pages/DashboardNotFound/DashboardNotFound";
import useAuth from "./Store/useAuth";
function App() {
  const queryClient = new QueryClient();
  const darkMode = useMyTheme((state) => state.darkMode);
  const theme = getTheme(darkMode);
  const user = useAuth((state) => state.user);

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
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfileLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="account" replace />} />
              <Route path="account" element={<EditForm user={user} />} />
              <Route path="changepassword" element={<ChangePassForm />} />
            </Route>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <RoleProtectedRoute allowedRoles={"admin"}>
                    <DashboardLayout />
                  </RoleProtectedRoute>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="Tours" replace />} />
              <Route path="Tours" element={<ToursDash />} />
              <Route path="Users" element={<UsersDash />} />
              <Route path="Reviews" element={<ReviewsDash />} />
              <Route path="Bookings" element={<></>} />
              <Route path="addTour" element={<AddTour />} />
              <Route path="editTour/:id" element={<EditTour />} />
              <Route path="*" element={<DashboardNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
