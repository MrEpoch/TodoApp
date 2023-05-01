import { Route, Routes } from 'react-router-dom';
import Login from './authPages/login';
import SignUp from './authPages/signup';
import Dashboard from "./TodoComponents/dashboard";
import LandingPage from './landingPage';

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
            </Routes>
        </>
    )
}

