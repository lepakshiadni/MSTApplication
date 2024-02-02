import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "../component/adminLogin";
import AdminOtp from "../component/adminOtp";
import Login from "../component/adminLandingPage";
import AdminPostPage from "../component/AdminPostPage";
import PrivateRoute from "./PrivateRoute";

function RouteComponent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
          <Route path="/landing" element={<Login />} />
          <Route path="/adminPost" element={<AdminPostPage />} />
          </Route>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/verifyOtp" element={<AdminOtp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouteComponent;
