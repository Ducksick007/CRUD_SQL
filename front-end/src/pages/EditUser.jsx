import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../components/Styles/Index.css'
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prefix: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setFormData(response.data);
    } catch (err) {
      alert("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, formData);
      alert("ข้อมูลผู้ใช้ถูกอัปเดต");
      navigate("/manage-users");
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">แก้ไขข้อมูลผู้ใช้</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">คำนำหน้า</label>
          <select
            className="form-select"
            name="prefix"
            value={formData.prefix}
            onChange={handleChange}
          >
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
        <button type="submit" className="btn btn-primary">
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
};

export default EditUser;
