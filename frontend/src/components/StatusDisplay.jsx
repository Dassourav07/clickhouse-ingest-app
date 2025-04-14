import React from "react";

function StatusDisplay({ status, recordCount }) {
  return (
    <div>
      <h4>Status: {status}</h4>
      {recordCount !== null && <p>Total Records Ingested: {recordCount}</p>}
    </div>
  );
}

export default StatusDisplay;
