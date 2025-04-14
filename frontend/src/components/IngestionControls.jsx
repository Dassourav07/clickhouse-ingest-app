import React from "react";
import axios from "axios";

function IngestionControls({ source, connectionParams, selectedColumns, setStatus, setRecordCount }) {
  const ingest = async () => {
    try {
      setStatus("Ingestion started...");
      const response = await axios.post("http://localhost:8000/ingest", {
        source,
        connectionParams,
        selectedColumns,
      });
      setRecordCount(response.data.record_count);
      setStatus("Ingestion completed.");
    } catch (err) {
      setStatus("Ingestion failed.");
    }
  };

  return <button onClick={ingest}>Start Ingestion</button>;
}

export default IngestionControls;
