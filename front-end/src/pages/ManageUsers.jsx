import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import '../components/Styles/Index.css'
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [genderFilter, setGenderFilter] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      let filteredUsers = response.data;

      if (genderFilter) {
        filteredUsers = filteredUsers.filter((user) => user.gender === genderFilter);
      }

      filteredUsers.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.age - b.age;
        } else {
          return b.age - a.age;
        }
      });

      setUsers(filteredUsers);
      setLoading(false);
    } catch (err) {
      setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sortOrder, genderFilter]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("ผู้ใช้ถูกลบแล้ว");
      fetchUsers();
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการลบผู้ใช้");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">จัดการข้อมูลผู้ใช้</h2>
      <div className="d-flex justify-content-between mb-4">
        <div className="w-25">
          <label className="form-label">จัดเรียงตามอายุ</label>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="form-select"
          >
            <option value="desc">จากอายุมากไปน้อย</option>
            <option value="asc">จากอายุน้อยไปมาก</option>
          </select>
        </div>
        <div className="w-25">
          <label className="form-label">กรองตามเพศ</label>
          <select
            onChange={(e) => setGenderFilter(e.target.value)}
            value={genderFilter}
            className="form-select"
          >
            <option value="">ทั้งหมด</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center">กำลังโหลดข้อมูล...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <table className="table table-striped table-hover border rounded">
          <thead>
            <tr>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>อายุ</th>
              <th>เพศ</th>
              <th>เบอร์โทร</th>
              <th>อีเมล</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.prefix}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger btn-sm"
                  >
                    ลบ
                  </button>
                  <Link to={`/edit-user/${user.id}`} className="btn btn-warning btn-sm ms-2">
                    แก้ไข
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
