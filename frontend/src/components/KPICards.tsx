import React from "react";

interface KPIProps {
  total: number;
  idle: number;
  delivering: number;
  failed: number;
}

const cardStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  borderRadius: "12px",
  backgroundColor: "#FFFFFF",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
};

function KPICards({ total, idle, delivering, failed }: KPIProps) {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3>Total Robots</h3>
        <p>{total}</p>
      </div>
      <div style={cardStyle}>
        <h3>Idle</h3>
        <p>{idle}</p>
      </div>
      <div style={cardStyle}>
        <h3>Delivering</h3>
        <p>{delivering}</p>
      </div>
      <div style={cardStyle}>
        <h3>Failed</h3>
        <p>{failed}</p>
      </div>
    </div>
  );
}

export default KPICards;