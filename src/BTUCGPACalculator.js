import React, { useState } from "react";
import "./BTUCGPACalculator.css"; // External CSS file

const semesters = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function BTUCGPACalculator() {
  const [data, setData] = useState(
    semesters.map(() => ({ sgpa: "", credits: "" }))
  );
  const [cgpa, setCgpa] = useState(null);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    data.forEach(({ sgpa, credits }) => {
      const s = parseFloat(sgpa);
      const c = parseFloat(credits);
      if (!isNaN(s) && !isNaN(c)) {
        totalGradePoints += s * c;
        totalCredits += c;
      }
    });

    const result = totalCredits ? (totalGradePoints / totalCredits).toFixed(2) : 0;
    setCgpa(result);
  };

  return (
    <div className="calculator-container">
      <h1 className="title">BTU CGPA Calculator (8 Semesters)</h1>
      <div className="semester-grid">
        {semesters.map((sem, i) => (
          <div key={i} className="semester-card">
            <h2 className="semester-heading">Semester {sem}</h2>
            <input
              type="number"
              step="0.01"
              placeholder="Enter SGPA"
              className="input-field"
              value={data[i].sgpa}
              onChange={(e) => handleChange(i, "sgpa", e.target.value)}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Enter Credits"
              className="input-field"
              value={data[i].credits}
              onChange={(e) => handleChange(i, "credits", e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="button-container">
        <button onClick={calculateCGPA} className="calculate-button">
          🎓 Calculate CGPA
        </button>
      </div>

      {cgpa && (
        <div className="result-box">
          🎯 Final CGPA: <span>{cgpa}</span>
        </div>
      )}
    </div>
  );
}
