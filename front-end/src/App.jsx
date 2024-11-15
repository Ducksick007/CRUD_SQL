import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // นำเข้า Navbar
import Home from "./pages/Home"; // นำเข้า Home
import ManageUsers from "./pages/ManageUsers"; // นำเข้า ManageUsers
import EditUser from "./pages/EditUser"; // นำเข้า EditUser
import './components/Styles/Index.css'

const App = () => {
  return (
    <Router>
      <Navbar /> {/* แสดง Navbar */}
      <div className="container mt-1">
        <Routes>
          {/* กำหนด Routing ของแต่ละหน้า */}
          <Route path="/" element={<Home />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/edit-user/:id" element={<EditUser />} /> {/* เส้นทางสำหรับการแก้ไขผู้ใช้ */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
