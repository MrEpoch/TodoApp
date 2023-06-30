import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./authPages/login";
import SignUp from "./authPages/signup";
import Dashboard from "./TodoComponents/TodoPage";
import TemplateTodoList from "./TodoComponents/TodoTemplate";
import LandingPage from "./landingPage";
import DashboardMain from "./TodoComponents/dashboard";
import DashboardCollectionMain from "./TodoComponents/TodoCollection";
import { unsecure_JWT_token_storage_name } from "./apiFetching";

export function ProtectRoutes({ children }: any) {
  const navigate = useNavigate();

  if (!localStorage.getItem(unsecure_JWT_token_storage_name)) {
    navigate("/login");
  }

  return <>{children}</>;
}

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/todo"
          element={
            <ProtectRoutes>
              <Dashboard>
                <DashboardMain />
              </Dashboard>
            </ProtectRoutes>
          }
        />
        <Route
          path="/todo/collections"
          element={
            <ProtectRoutes>
              <Dashboard>
                <DashboardCollectionMain />
              </Dashboard>
            </ProtectRoutes>
          }
        />
        <Route
          path="/todo/:id"
          element={
            <ProtectRoutes>
              <Dashboard>
                <TemplateTodoList />
              </Dashboard>
            </ProtectRoutes>
          }
        />
      </Routes>
    </>
  );
}
