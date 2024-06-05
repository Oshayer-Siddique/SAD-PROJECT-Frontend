import React from 'react'
import  { useState, useEffect } from 'react';
import "./Sales.css"

import axios from 'axios';


function Sales() {
    const [salesData, setSalesData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/sales/sales-by-product');
          setSalesData(response.data.salesByProduct);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching sales data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }




  return (
    <div className='sales-container'>
    <h2>Sales By Product</h2>
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Sales Amount</th>
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
  )
}

export default Sales