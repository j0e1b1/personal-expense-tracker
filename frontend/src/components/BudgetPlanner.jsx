import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

const BudgetPlanner = () => {
  const { budget, setBudget, transactions } = useContext(GlobalContext);
  const [amount, setAmount] = useState('');

  const totalExpenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const remaining = budget + totalExpenses; // correct: budget - abs(expenses)

  const onSubmit = (e) => {
    e.preventDefault();
    setBudget(+amount);
    setAmount('');
  };

  return (
    <div>
      <h3>Set Monthly Budget</h3>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget"
        />
        <button className="btn">Set Budget</button>
      </form>

      <p><strong>Budget:</strong> ₹{budget}</p>
      <p><strong>Total Expenses:</strong> ₹{Math.abs(totalExpenses)}</p>
      <p><strong>Remaining Budget:</strong> ₹{remaining}</p>
    </div>
  );
};

export default BudgetPlanner;
