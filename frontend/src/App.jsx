import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/Login.jsx";
import Signup from "./pages/auth/signup/Signup";
import LayoutWithNavbar from "./pages/layout/LayoutWithNavbar.jsx";
import Dashboard from "./components/Dashboard.jsx";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar></LayoutWithNavbar>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={<LayoutWithNavbar><Dashboard></Dashboard></LayoutWithNavbar>}></Route>
      </Routes>
    </>
  );
}
