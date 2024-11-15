import React from "react";
import UserForm from "../components/UserForm"; // นำเข้าฟอร์ม
import '../components/Styles/Index.css'
const Home = () => {
  return (
    <div className="container">
      {/* <h1 className="my-4 text-center">สมัครสมาชิก</h1> */}
      <UserForm />
    </div>
  );
};

export default Home;
