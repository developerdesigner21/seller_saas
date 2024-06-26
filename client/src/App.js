import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import SuperAdmin from "./components/Admin/SuperAdmin";
import AdminSignIn from "./components/Admin/Authentication/AdminSignIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import UserSignIn from "./components/User/Authentication/UserSignIn";
import User from "./components/User/User";

function App() {
  const AdminPrivateRoutes = () => {
    let isAuthorized = localStorage.getItem("id_token") && localStorage.getItem("role")==="admin";
    return isAuthorized ? <Outlet /> : <Navigate to="/admin/login" />;
  };

  const AdminNotLoginRoutes = () => {
    let isAuthorized = localStorage.getItem("id_token") && localStorage.getItem("role")==="admin";
    return isAuthorized ? <Navigate to="/admin" /> : <Outlet />;
  };

  const UserPrivateRoutes = () => {
    let isAuthorized = localStorage.getItem("id_token") && localStorage.getItem("role")==="user";
    return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
  };

  const UserNotLoginRoutes = () => {
    let isAuthorized = localStorage.getItem("id_token") && localStorage.getItem("role")==="user";
    return isAuthorized ? <Navigate to="/user" /> : <Outlet />;
  };

  const AutoRedirectionRoutes = () => {
    let isAuthorized = localStorage.getItem("id_token") && localStorage.getItem("role");
    return isAuthorized ? localStorage.getItem("role")==="admin" ? <Navigate to="/admin" /> : <Navigate to="/user" /> : <Outlet />;
  };


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AutoRedirectionRoutes/>}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          
          <Route element={<AdminNotLoginRoutes/>}>
            <Route path="/admin/login" element={<AdminSignIn />} />
          </Route>

          <Route element={<AdminPrivateRoutes/>}>
            <Route path="/admin/*" element={<SuperAdmin />} />
          </Route>

          <Route element={<UserNotLoginRoutes/>}>
            <Route path="/login" element={<UserSignIn />} />
          </Route>

          <Route element={<UserPrivateRoutes/>}>
            <Route path="/user/*" element={<User />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
