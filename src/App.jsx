import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/Forgot/ForgotPassword";
import ClientPage from "./pages/ClientPage/ClientPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";

import "./App.css";


function App() {
  return (
    <Router>
      <Routes>

          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
           </Routes>
    </Router>
  );
}


export default App;
