import { Route, Routes } from "react-router-dom";
import Login from "./authPages/login";
import SignUp from "./authPages/signup";
import LandingPage from "./landingPage";
import ErrorPage from "./errorpage";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
     </Routes>
    </>
  );
}
