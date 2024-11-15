import React, { useState } from "react";
import axios from "axios";
import './Styles/Index.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    prefix: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);  // ตรวจสอบข้อมูลใน formData
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users", formData);
      alert("ผู้ใช้ถูกเพิ่มแล้ว");
      setFormData({
        prefix: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
      });
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow-sm bg-white border">
      <h3 className="mb-4 text-center text-primary">สมัครสมาชิก</h3>
      <div className="mb-3">
        <label className="form-label">คำนำหน้า</label>
        <select
          className="form-select"
          name="prefix"
          value={formData.prefix}
          onChange={handleChange}
        >
          <option value="">โปรดระบุคำนำหน้า</option> {/* เพิ่มข้อความเชิญชวน */}
          <option value="เด็กชาย">เด็กชาย</option>
          <option value="เด็กหญิง">เด็กหญิง</option>
          <option value="นาย">นาย</option>
          <option value="นางสาว">นางสาว</option>
          <option value="นาง">นาง</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">ชื่อ</label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">นามสกุล</label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">อายุ</label>
        <input
          type="number"
          className="form-control"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">เพศ</label>
        <select
          className="form-select"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">โปรดระบุเพศ</option> {/* เพิ่มข้อความเชิญชวน */}
          <option value="ชาย">ชาย</option>
          <option value="หญิง">หญิง</option>
          <option value="ไม่ระบุ">ไม่ระบุ</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">เบอร์โทร</label>
        <input
          type="tel"
          className="form-control"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">อีเมล</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        สมัครสมาชิก
      </button>
    </form>
  );
};

export default UserForm;
