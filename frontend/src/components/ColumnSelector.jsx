import React from "react";

function ColumnSelector({ columns, selectedColumns, setSelectedColumns }) {
  const toggleColumn = (col) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  return (
    <div>
      <h3>Step 3: Select Columns</h3>
      {columns.map((col) => (
        <label key={col} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedColumns.includes(col)}
            onChange={() => toggleColumn(col)}
          />
          {col}
        </label>
      ))}
    </div>
  );
}

export default ColumnSelector;