import React from "react";

function SourceSelector({ source, setSource }) {
  return (
    <div>
      <h3>Step 1: Select Data Source</h3>
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="ClickHouse">ClickHouse</option>
        <option value="FlatFile">Flat File</option>
      </select>
    </div>
  );
}

export default SourceSelector;
