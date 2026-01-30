import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login.jsx";
import Signup from "./pages/auth/signup/Signup";
import LayoutWithNavbar from "./pages/layout/LayoutWithNavbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LandingPage from "./components/LandingPage.jsx";
import KanbanBoard from "./components/KanbanBoard.jsx";
import Features from "./components/Features.jsx";
import WhyTrackly from "./components/WhyTrackly.jsx";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar><LandingPage></LandingPage></LayoutWithNavbar>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/features' element={<LayoutWithNavbar><Features></Features></LayoutWithNavbar>}></Route>
        <Route path='/whyTrackly' element={<LayoutWithNavbar><WhyTrackly></WhyTrackly></LayoutWithNavbar>}></Route>
        <Route path='/dashboard' element={<LayoutWithNavbar><Dashboard></Dashboard></LayoutWithNavbar>}></Route>
        <Route path='/applications' element={<LayoutWithNavbar><KanbanBoard></KanbanBoard></LayoutWithNavbar>}></Route>
      </Routes>
    </>
  );
}
