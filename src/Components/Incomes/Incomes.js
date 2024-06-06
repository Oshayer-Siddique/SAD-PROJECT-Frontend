import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { plus } from "../../Utils/icons";
import { Pie } from "react-chartjs-2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const Incomes = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    amount: "",
    category: "",
    description: "",
  });

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [chartData, setChartData] = useState({});

  const [totalByCategory, setTotalByCategory] = useState([]);


  const [error, setError] = useState(null);


  useEffect(() => {
    fetchData();
    fetchIncomeData();
    fetchTotalIncome();
    fetchTotalByCategory();
    
  }, []);


  const fetchTotalByCategory = async () => {
    try {
        const response = await axios.get('http://localhost:5000/tracking/total-by-category');
        setTotalByCategory(response.data);
    } catch (error) {
        setError('Error fetching total by category');
    }
};

  const fetchIncomeData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tracking/getallincome"
      ); // Assuming your backend route is '/api/incomes'
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tracking/totalincome"
      ); // Assuming your backend route is '/api/total-income'
      setTotalIncome(response.data.totalIncomes);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewIncome = (income) => {
    setSelectedIncome(income);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/tracking/crtincome",
        formData
      );
      setMessage("Income created successfully");
      // Reset form data
      setFormData({
        title: "",
        date: "",
        amount: "",
        category: "",
        description: "",
      });
      fetchIncomeData();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating income");
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tracking/total-by-category");
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching the data", error);
    }
  };




  
  // Filtered incomes based on search query
  const filteredIncomes = incomes.filter((income) =>
    income.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("Filtered Incomes:", filteredIncomes);
  
  
  const data = {
    labels: totalByCategory.map(category => category._id),
    datasets: [
        {
            label: 'Total Amount by Category',
            data: totalByCategory.map(category => category.totalAmount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Total Amount by Category',
        },
    },
};// Debugging log

  return (
    <IncomeStyled>

    <div className="chart-container">
            <h2>Income by Category</h2>
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
            <Pie data={data} options={options} />
        </div>
      <div className="total-income">
        Total Income: <span>${totalIncome}</span>
      </div>

      <div className="content-container">
        <div className="income-content">
          <div className="incomes">
            <h2>Create Income</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-control">
                <label></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter title"
                />
              </div>
              <div className="input-control">
                <label></label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-control">
                <label></label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  placeholder="Enter amount"
                />
              </div>
              <div className="input-control">
                <label></label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  placeholder="Enter category"
                />
              </div>
              <div className="input-control">
                <label></label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                ></textarea>
              </div>
              <div className="submit-btn">
                <button type="submit">{plus}Add Income</button>
              </div>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
        <div className="income-list">
          <h2>Income List</h2>
          <div className="searchbar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />

            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-bar"
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncomes.map((income) => (
                <tr key={income._id}>
                  <td>{income._id}</td>
                  <td>{income.title}</td>
                  <td>{income.amount}</td>

                  <td>
                    <button
                      className="button"
                      onClick={() => handleViewIncome(income)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedIncome && (
        <div className="income-details">
          <h3>Income Details</h3>
          <p>
            <strong>Title:</strong> {selectedIncome.title}
          </p>
          <p>
            <strong>Date:</strong> {selectedIncome.date}
          </p>
          <p>
            <strong>Amount:</strong> ${selectedIncome.amount}
          </p>
          <p>
            <strong>Category:</strong> {selectedIncome.category}
          </p>
          <p>
            <strong>Description:</strong> {selectedIncome.description}
          </p>
          <button
            className="button close-button"
            onClick={() => setSelectedIncome(null)}
          >
            Close
          </button>


        </div>
      )}
    </IncomeStyled>
  );
};

const IncomeStyled = styled.div`

.pie-chart {
  width: 300px; /* Adjust the width of the container */
  height: 300px; /* Adjust the height of the container */
  margin: 0 auto; /* Center the container horizontally */
  border: 0px solid #ccc; /* Add a border for visual clarity */
}

.pie-chart h2 {
  text-align: center; /* Center the heading */
  margin-bottom: 10px; /* Add some space below the heading */
}

/* Style the pie chart itself */


  .searchbar {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
  }

  .searchbar input[type="text"] {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
  }

  .searchbar input[type="text"]::placeholder {
    color: #aaa;
  }

  .searchbar .search-icon {
    margin-right: 8px;
    color: #777;
  }

  .income-details {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
    width: 50%;
    margin-left: 25%;
  }

  .income-details h3 {
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: bold;
  }

  .income-details p {
    margin: 8px 0;
    font-size: 16px;
  }

  .button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    margin-right: 8px;
  }

  .button:hover {
    background-color: #0056b3;
  }

  .close-button {
    background-color: #dc3545;
  }

  .close-button:hover {
    background-color: #c82333;
  }

  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: auto;

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    width: 70%;
    margin-left: 15%;
    mrgin-top: 30%;
  }

  .total-income span {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-green);
  }

  .content-container {
    display: flex;
    justify-content: space-between;
  }

  .income-content,
  .income-list {
    flex: 1;
    margin: 0 10px;
    margin-top: 2rem;
  }

  .income-list table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 2rem;
  }

  .income-list {
    max-height: 500px; /* Set a fixed height for the scrollable area */
    overflow-y: auto; /* Enable vertical scrolling */
  }

  .income-list th,
  .income-list td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .income-list th {
    background-color: #f2f2f2;
  }

  .income-list tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .income-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }

  .income-content .incomes {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .income-content .incomes .input-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }

  .income-content .incomes input,
  .income-content .incomes textarea,
  .income-content .incomes select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    width: 100%;
  }

  .income-content .incomes .input-control input {
    width: calc(50% - 2rem);
  }

  .income-content .incomes .selects {
    display: flex;
    justify-content: flex-end;
  }

  .income-content .incomes .selects select {
    color: rgba(34, 34, 96, 0.4);
  }

  .income-content .incomes .selects select:focus,
  .income-content .incomes .selects select:active {
    color: rgba(34, 34, 96, 1);
  }

  .income-content .incomes .submit-btn {
    display: flex;
    justify-content: flex-start;
  }

  .income-content .incomes .submit-btn button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
    border: none;
    background-color: #3498db;
    color: #fff;
    border-radius: 5px;
    margin-left: 1rem;
  }

  .income-content .incomes .submit-btn button:hover {
    background-color: #2980b9 !important;
  }

  .income-content .incomes .submit-btn button .icon {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export default Incomes;
