import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";

// Auth & Standalone Pages
import Login from "./pages/auth/login/Login.jsx";
import Signup from "./pages/auth/signup/Signup";
import ResumeBuilder from "./components/ResumeBuilder.jsx";
import NewApplication from "./components/NewApplication.jsx";
import NotFound from "./pages/errorPages/NotFound.jsx";
import GlobalError from "./pages/errorPages/GlobalError.jsx";
import AboutUs from "./pages/static/AboutUs.jsx";
import CareerBlog from "./pages/blog/CareerBlog.jsx";
import ContactUs from "./pages/static/ContactUs.jsx";

// Layout & Feature Pages
import LayoutWithNavbar from "./pages/layout/LayoutWithNavbar.jsx";
import RoleBasedDashboard from "./pages/layout/RoleBasedDashboard.jsx";
import LandingPage from "./components/LandingPage.jsx";
import MyApplications from "./components/MyApplications.jsx";
import Features from "./components/Features.jsx";
import WhyTrackly from "./components/WhyTrackly.jsx";
import JobBoard from "./components/JobBoard.jsx";
import JobDetails from "./components/JobDetails.jsx";
import SavedJobs from "./components/SavedJobs.jsx";
import UserDetails from "./components/UserDetails.jsx";


/**
 * Global functional layout wrapper that adds 
 * Scroll Restoration to all routes.
 */
const RootLayout = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
);

/**
 * Helper to wrap components with Navbar Layout 
 * for the new router structure.
 */
const withNavbar = (Component) => (
  <LayoutWithNavbar>
    <Component />
  </LayoutWithNavbar>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <GlobalError />, 
    children: [
      // 1. Static Pages with Navbar
      { index: true, element: withNavbar(LandingPage) },
      { path: "features", element: withNavbar(Features) },
      { path: "whyTrackly", element: withNavbar(WhyTrackly) },
      { path: "about", element: withNavbar(AboutUs) },
      { path: "blog", element: withNavbar(CareerBlog) },
      { path: "contact", element: withNavbar(ContactUs) },

      // 2. Dashboards
      { path: "dashboard", element: withNavbar(RoleBasedDashboard) },
      { path: "dashboard/user/:userId", element: withNavbar(UserDetails) },

      // 3. Applications
      { path: "applications", element: withNavbar(MyApplications) },
      { path: "applications/create", element: <NewApplication /> }, // No Navbar

      // 4. Job Board
      { path: "jobs", element: withNavbar(JobBoard) },
      { path: "jobs/:id", element: withNavbar(JobDetails) },
      { path: "jobs/savedjobs", element: withNavbar(SavedJobs) },

      // 5. Standalone Tools & Auth
      { path: "build-resume", element: <ResumeBuilder /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // 7. Fallback
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AppProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </AppProvider>
  );
}