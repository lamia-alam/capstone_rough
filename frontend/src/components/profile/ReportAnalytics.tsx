import React from "react";

export const ReportAnalytics: React.FC = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Report Analytics</h2>
        <div>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};
