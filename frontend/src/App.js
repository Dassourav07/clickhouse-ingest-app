import React, { useState } from "react";
import SourceSelector from "./components/SourceSelector";
import ClickHouseForm from "./components/ClickHouseForm";
import FlatFileForm from "./components/FlatFileForm";
import ColumnSelector from "./components/ColumnSelector";
import IngestionControls from "./components/IngestionControls";
import StatusDisplay from "./components/StatusDisplay";
import "./App.css";

function App() {
  const [source, setSource] = useState("");
  const [connectionParams, setConnectionParams] = useState({});
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [status, setStatus] = useState("Waiting...");
  const [recordCount, setRecordCount] = useState(null);

  return (
    <div className="App">
      <div className="header">
        <h1>ClickHouse & Flat File Ingestion Tool</h1>
      </div>

      <div className="form-container">
        <SourceSelector source={source} setSource={setSource} />
        <hr />

        {source === "ClickHouse" && (
          <ClickHouseForm
            setConnectionParams={setConnectionParams}
            setColumns={setColumns}
            setStatus={setStatus}
          />
        )}

        {source === "FlatFile" && (
          <FlatFileForm
            setConnectionParams={setConnectionParams}
            setColumns={setColumns}
            setStatus={setStatus}
          />
        )}

        {columns.length > 0 && (
          <>
            <ColumnSelector
              columns={columns}
              selectedColumns={selectedColumns}
              setSelectedColumns={setSelectedColumns}
            />
            <IngestionControls
              source={source}
              connectionParams={connectionParams}
              selectedColumns={selectedColumns}
              setStatus={setStatus}
              setRecordCount={setRecordCount}
            />
          </>
        )}
      </div>

      <StatusDisplay status={status} recordCount={recordCount} />
    </div>
  );
}

export default App;

