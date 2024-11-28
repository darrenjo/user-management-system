import React, { useEffect, useState } from "react";
import api from "../api/api";

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await api.get("/admin/employees");
    setEmployees(response.data);
  };

  const handleSearch = async () => {
    const response = await api.get(`/admin/employees/search?query=${search}`);
    setEmployees(response.data);
  };

  const handlePrint = () => {
    window.open("http://localhost:5000/api/admin/employees/print", "_blank");
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input
        type="text"
        placeholder="Search by NIP/Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handlePrint}>Print</button>
      <table border="1">
        <thead>
          <tr>
            <th>NIP</th>
            <th>Name</th>
            <th>Birth Place</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.nip}>
              <td>{emp.nip}</td>
              <td>{emp.name}</td>
              <td>{emp.birth_place || "-"}</td>
              <td>{emp.phone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
