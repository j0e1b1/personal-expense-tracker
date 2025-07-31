import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import React from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import BudgetPlanner from './components/BudgetPlanner';
import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="container">
          <Header />
          <nav>
            <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
          </nav>
          <Routes>
            <Route path="/" element={
              <>
                <BudgetPlanner />
                <Balance />
                <IncomeExpense />
                <TransactionList />
                <AddTransaction />
              </>
            } />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
