import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import {
  Pie,
  Line,
  Bar,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { transactions } = useContext(GlobalContext);

  const expenseTransactions = transactions.filter(t => t.amount < 0);

  // 1️⃣ Group by category
  const categoryMap = {};
  expenseTransactions.forEach(t => {
    const category = t.text || 'Other';
    categoryMap[category] = (categoryMap[category] || 0) + Math.abs(t.amount);
  });

  // 2️⃣ Group by date (YYYY-MM-DD)
  const dateMap = {};
  expenseTransactions.forEach(t => {
    const date = new Date(t.createdAt || Date.now()).toISOString().split('T')[0]; // use createdAt if available
    dateMap[date] = (dateMap[date] || 0) + Math.abs(t.amount);
  });

  // 3️⃣ Group by month
  const monthMap = {};
  expenseTransactions.forEach(t => {
    const date = new Date(t.createdAt || Date.now());
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    monthMap[month] = (monthMap[month] || 0) + Math.abs(t.amount);
  });

  // 🔺 Find Peak Spending Day
  const peakDate = Object.entries(dateMap).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['', 0]
  );

  return (
    <div className="container">
      <h2>📊 Dashboard & Visual Analytics</h2>

      <div style={{ maxWidth: 400, margin: '30px auto' }}>
        <h4>Spending by Category (Pie Chart)</h4>
        <Pie
          data={{
            labels: Object.keys(categoryMap),
            datasets: [
              {
                data: Object.values(categoryMap),
                backgroundColor: ['#f87171', '#60a5fa', '#facc15', '#34d399', '#a78bfa'],
              },
            ],
          }}
        />
      </div>

      <div style={{ maxWidth: 500, margin: '30px auto' }}>
        <h4>Monthly Spending (Bar Chart)</h4>
        <Bar
          data={{
            labels: Object.keys(monthMap),
            datasets: [
              {
                label: '₹ Total Spent',
                data: Object.values(monthMap),
                backgroundColor: '#818cf8',
              },
            ],
          }}
        />
      </div>



      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <h4>🚨 Peak Spending Day</h4>
        <p style={{ fontSize: '18px', color: '#ef4444' }}>
          {peakDate[0]} — ₹{peakDate[1].toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;