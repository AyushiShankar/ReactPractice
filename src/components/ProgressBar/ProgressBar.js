import  { useState } from "react";

function ProgressBar() {
  const [percentage, setPercentage] = useState(0);

  function handleProgress(delta) {
    setPercentage(prev => 
     Math.max(0, Math.min(100, prev + delta)));
  }

  const getBarColor = () => {
    if (percentage >= 80) return "green";
    if (percentage >= 40) return "orange";
    return "red";
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Progress Bar</h2>
      <div
        style={{
          height: "25px",
          backgroundColor: "#ddd",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          id="testBgColor"
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: getBarColor(),
            transition: "width 0.3s ease-in-out",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {`${percentage}%`}
        </span>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => handleProgress(-10)}>-10%</button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => handleProgress(+10)}
        >
          +10%
        </button>
      </div>
    </div>
  );
}

export default ProgressBar;
