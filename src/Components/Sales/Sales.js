import React from 'react'
import  { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

// import { Chart as ChartJS, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';


import "./Sales.css"

import axios from 'axios';



function Sales() {
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [topSellingProductsUnits, setTopSellingProductsUnits] = useState([]);

    const [revenueByDay, setRevenueByDay] = useState({});
    const [salesByMonth, setSalesByMonth] = useState({});


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalSales, setTotalSales] = useState(null);
    const [error, setError] = useState('');

  
    useEffect(() => {

        fetchSalesByMonth();
        fetchTopSellingProducts();
        fetchTopSellingProductsUnits();
        fetchRevenueByDay();
        

      fetchData();
    }, []);


const fetchSalesByMonth = async () => {
    try {
        const response = await axios.get('http://localhost:5000/sales/sales-by-month');
        setSalesByMonth(response.data.salesByMonth);
    } catch (error) {
        setError('Error fetching sales by month');
    }
};



    const fetchRevenueByDay = async () => {
        try {
            const response = await axios.get('http://localhost:5000/sales/revenue-by-day');
            setRevenueByDay(response.data.revenueByDay);
        } catch (error) {
            setError('Error fetching revenue by day');
        }
    };



    const dataM = {
        labels: Object.keys(salesByMonth),
        datasets: [
            {
                label: 'Sales by Month',
                data: Object.values(salesByMonth),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const optionsM = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Sales',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales',
            },
        },
    };



    const data = {
        labels: Object.keys(revenueByDay),
        datasets: [
            {
                label: 'Revenue by Day',
                data: Object.values(revenueByDay),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
            },
        ],
    };




    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'category', // Specify the scale type as 'category'
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                // beginAtZero: true, // Start the y-axis from zero

                title: {
                    display: true,
                    text: 'Revenue',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Revenue',
            },
        },
    };


    const fetchTopSellingProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/sales/top-selling-products-by-revenue');
            setTopSellingProducts(response.data.topSellingProducts);
        } catch (error) {
            setError('Error fetching top selling products');
        }
    };

    const fetchTopSellingProductsUnits = async () => {
        try {
            const response = await axios.get('http://localhost:5000/sales/top-selling-products-by-units');
            setTopSellingProductsUnits(response.data.topSellingProducts);
        } catch (error) {
            setError('Error fetching top selling products');
        }
    };




    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/sales/sales-by-product');
          setSalesData(response.data.salesByProduct);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching sales data:', error);
        }
      };
  
    if (loading) {
      return <div>Loading...</div>;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/sales/total-sales', { startDate, endDate });
            setTotalSales(response.data.totalSales);
            setError('');
        }
        catch(error){
            setError('Error fetching total sales');
            setTotalSales(null);
        }

    }




  return (

    <div>

<div className='dashboard-container'>
            <div className='sales-container'>
                <h2>Sales By Product</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(salesData).map(([productName, salesAmount]) => (
                            <tr key={productName}>
                                <td>{productName}</td>
                                <td>${salesAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='top-selling-products'>
                <h2>Top Selling Products by Revenue</h2>
                {error && (
                    <div>
                        <p style={{ color: 'red' }}>{error}</p>
                    </div>
                )}
                <ul>
                    {topSellingProducts.map((product, index) => (
                        <li key={index}>
                            <span>{product.productName}: ${product.revenue.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='top-selling-products-units'>
                <h2>Top Selling Products by Units</h2>
                {error && (
                    <div>
                        <p style={{ color: 'red' }}>{error}</p>
                    </div>
                )}
                <ul>
                    {topSellingProductsUnits.map((product, index) => (
                        <li key={index}>
                            <span>{product.productName}: {product.quantitySold.toFixed(0)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


<div className='sales-date-range'>
<h1>Total Sales</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Start Date:</label>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
        </div>
        <div>
            <label>End Date:</label>
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
        </div>
        <button type="submit">Get Total Sales</button>
    </form>
    {totalSales !== null && (
        <div>
            <h2>Total Sales: ${totalSales.toFixed(2)}</h2>
        </div>
    )}
    {error && (
        <div>
            <p style={{ color: 'red' }}>{error}</p>
        </div>
    )}

</div>


<div className="chart-container">
            <h2>Revenue by Day</h2>
            {error && (
                <div>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            )}
            <Line data={data} options={options} />
        </div>


        <div className="chart-container-bar">
            <h2>Sales by Month</h2>
            {error && (
                <div>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            )}
            <Bar data={dataM} options={optionsM} />
        </div>

</div>




  )
}

export default Sales