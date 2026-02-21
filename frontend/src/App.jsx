import { Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AppProvider } from "./context/AppContext.jsx";

import Login from "./pages/auth/login/Login.jsx";
import Signup from "./pages/auth/signup/Signup";
import LayoutWithNavbar from "./pages/layout/LayoutWithNavbar.jsx";
import RoleBasedDashboard from "./pages/layout/RoleBasedDashboard.jsx";
import LandingPage from "./components/LandingPage.jsx";
import MyApplications from "./components/MyApplications.jsx";
import NewApplication from "./components/NewApplication.jsx";
import Features from "./components/Features.jsx";
import WhyTrackly from "./components/WhyTrackly.jsx";
import JobBoard from "./components/JobBoard.jsx";
import JobDetails from "./components/JobDetails.jsx";
import SavedJobs from "./components/SavedJobs.jsx";
import ResumeBuilder from "./components/ResumeBuilder.jsx";
import UserDetails from "./components/UserDetails.jsx";



export default function App() {

  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar><LandingPage></LandingPage></LayoutWithNavbar>}></Route>
        <Route path='/build-resume' element={<ResumeBuilder></ResumeBuilder>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/features' element={<LayoutWithNavbar><Features></Features></LayoutWithNavbar>}></Route>
        <Route path='/whyTrackly' element={<LayoutWithNavbar><WhyTrackly></WhyTrackly></LayoutWithNavbar>}></Route>
        <Route path='/dashboard' element={
          <LayoutWithNavbar>
            <RoleBasedDashboard></RoleBasedDashboard>
          </LayoutWithNavbar>
        }>
        </Route>
        <Route path='/dashboard/user/:userId' element={
            <LayoutWithNavbar>
              <UserDetails></UserDetails>
            </LayoutWithNavbar>
          }></Route>
        <Route path='/applications' element={<LayoutWithNavbar><MyApplications></MyApplications></LayoutWithNavbar>}></Route>
        <Route path='/applications/create' element={<NewApplication></NewApplication>}></Route>
        <Route path='/jobs' element={<LayoutWithNavbar><JobBoard></JobBoard></LayoutWithNavbar>}></Route>
        <Route path='/jobs/:id' element={<LayoutWithNavbar><JobDetails></JobDetails></LayoutWithNavbar>}></Route>
        <Route path='/jobs/savedjobs' element={<LayoutWithNavbar><SavedJobs></SavedJobs></LayoutWithNavbar>}></Route>

      </Routes>
    </AppProvider>
  );
}
