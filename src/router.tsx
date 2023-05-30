import { Route, Routes } from "react-router-dom";
import Login from "./authPages/login";
import SignUp from "./authPages/signup";
import Dashboard from "./TodoComponents/TodoPage";
import TemplateTodoList from "./TodoComponents/TodoTemplate";
import LandingPage from "./landingPage";
import DashboardMain from "./TodoComponents/dashboard";
import DashboardCollectionMain from "./TodoComponents/TodoCollection";
import ErrorPage from "./errorpage";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/todo"
          element={
            <Dashboard>
              <DashboardMain />
            </Dashboard>
          }
        />
        <Route
          path="/todo/collections"
          element={
            <Dashboard>
              <DashboardCollectionMain />
            </Dashboard>
          }
        />
        <Route
          path="/todo/:id"
          element={
            <Dashboard>
              <TemplateTodoList />
            </Dashboard>
          }
        />
      </Routes>
    </>
  );
}
