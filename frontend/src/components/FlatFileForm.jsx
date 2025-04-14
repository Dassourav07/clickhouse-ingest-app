import React, { useState } from "react";
import axios from "axios";

function FlatFileForm({ setConnectionParams, setColumns, setStatus }) {
  const [file, setFile] = useState(null);
  const [delimiter, setDelimiter] = useState(",");
  const [targetTable, setTargetTable] = useState(""); // Added state for table input

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("delimiter", delimiter);
    formData.append("target_table", targetTable); // Added target_table to form data

    try {
      setStatus("Uploading flat file...");
      const response = await axios.post("http://127.0.0.1:8000/flatfile_to_clickhouse", formData);
      setConnectionParams({ file, delimiter });
      setStatus(`File uploaded successfully. ${response.data.records} records added.`);
      setColumns(response.data.columns || []); // Set columns if returned
    } catch (err) {
      setStatus("Upload failed.");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Step 2: Upload Flat File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Delimiter"
        value={delimiter}
        onChange={(e) => setDelimiter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Target Table"
        value={targetTable}
        onChange={(e) => setTargetTable(e.target.value)} // Handle target table input
      />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default FlatFileForm;
