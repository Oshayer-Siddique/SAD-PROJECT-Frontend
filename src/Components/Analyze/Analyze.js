import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './Analyze.css';


function Analyze() {


    const [chartData, setChartData] = useState(null);

    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/forecast');
          const data = response.data;
          const dates = data.map(item => item.date);
          const revenues = data.map(item => item.revenue);
    
          setChartData({
            labels: dates,
            datasets: [
              {
                label: 'Forecasted Revenue',
                data: revenues,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching forecast data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);



  return (
    <div className="container">
      <h2>Revenue Forecast 30 Days</h2>
      <div className="chart-container">
        {chartData ? (
          <Line data={chartData} />
        ) : (
          <p className="loading-message">Loading chart...</p>
        )}
      </div>
    </div>
  )
}

export default Analyze
