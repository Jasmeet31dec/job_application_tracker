import { Route, Routes } from "react-router-dom";
import Header from "./pages/header/Header.jsx";
import Login from "./pages/auth/login/Login.jsx";
import Signup from "./pages/auth/signup/Signup";


export default function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    </>
  );
}
