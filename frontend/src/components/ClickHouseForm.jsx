import React, { useState } from "react";
import axios from "axios";

function ClickHouseForm({ setConnectionParams, setColumns, setStatus }) {
  const [form, setForm] = useState({ host: "", port: "", database: "", user: "", jwt_token: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const connect = async () => {
    try {
      setStatus("Connecting to ClickHouse...");
  
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const response = await axios.post("http://127.0.0.1:8000/connect_clickhouse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setConnectionParams(form);
      setColumns(response.data.columns);
      setStatus("Connected. Columns loaded.");
    } catch (err) {
      setStatus("Connection failed.");
      console.error(err.response?.data || err.message);
    }
  };
  

  return (
    <div>
      <h3>Step 2: ClickHouse Connection</h3>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={form[key]}
          onChange={handleChange}
        />
      ))}
      <button onClick={connect}>Connect</button>
    </div>
  );
}

export default ClickHouseForm;
