import { Route, Routes } from 'react-router-dom';
import Login from './authPages/login';
import SignUp from './authPages/signup';
import Dashboard, { DashboardCollectionMain, DashboardMain, TemplateTodoList } from "./TodoComponents/dashboard";
import LandingPage from './landingPage';

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/todo" element={<Dashboard> <DashboardMain /></Dashboard>} />
                <Route path='/todo/collections' element={<Dashboard> <DashboardCollectionMain/> </Dashboard>} /> 
                <Route path='/todo/:id' element={<Dashboard> <TemplateTodoList/> </Dashboard>} /> 
            </Routes>
        </>
    )
}

