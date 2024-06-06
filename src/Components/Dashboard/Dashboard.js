// Components.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [revenue, setRevenue] = useState(null);
  const [grossMargin, setGrossMargin] = useState(null);
  const [netIncome, setNetIncome] = useState(null);
  const [taxPercent, setTaxPercent] = useState("");
  const [depreciation, setDepreciation] = useState("");
  const [amortization, setAmortization] = useState("");
  const [error, setError] = useState("");

  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const revenueResponse = await axios.get(
          "http://localhost:5000/finance/revenue"
        );
        setRevenue(revenueResponse.data.Money);

        const grossMarginResponse = await axios.get(
          "http://localhost:5000/finance/gross-margin"
        );
        setGrossMargin(grossMarginResponse.data.Gross_Margin);
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/finance/net-income",
        {
          tax_percent: taxPercent,
          depreciation,
          amortization,
        }
      );
      setNetIncome(response.data.Net_Income);
      console.log(response.data);
    } catch (error) {
      setError("Error calculating net income");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadStatus(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Error uploading file");
    }
  };

  return (
    <div className="dashboard-container">


<div className="form-container">
    <h2>
      File Upload <i className="fas fa-upload"></i>
    </h2>
    <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
  </div>
      <div className="data-container">
        <h2>
          Revenue <i className="fas fa-dollar-sign"></i>
        </h2>
        <p>{revenue}</p>
      </div>


      <div className="data-container">
        <h2>
          Gross Margin <i className="fas fa-chart-line"></i>
        </h2>
        <p>{grossMargin}%</p>
      </div>
      <div className="form-container">
        <h2>
          Net Income <i className="fas fa-file-invoice-dollar"></i>
        </h2>{" "}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tax Percentage:</label>
            <input
              type="text"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Depreciation:</label>
            <input
              type="text"
              value={depreciation}
              onChange={(e) => setDepreciation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Amortization:</label>
            <input
              type="text"
              value={amortization}
              onChange={(e) => setAmortization(e.target.value)}
              required
            />
          </div>
          <button type="submit">Calculate Net Income</button>
        </form>
        {netIncome !== null && <p>Net Income: {netIncome}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>


    </div>
  );
};

export default Dashboard;
