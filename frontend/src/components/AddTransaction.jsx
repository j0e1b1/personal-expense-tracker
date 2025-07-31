import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  // Income
  const [incomeText, setIncomeText] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  // Expense
  const [expenseText, setExpenseText] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const submitIncome = (e) => {
    e.preventDefault();

    const processedAmount = Math.abs(incomeAmount);
    if (processedAmount < 0) {
      alert("Amount too low. Cannot deduct ₹17 from this income.");
      return;
    }

    addTransaction({
      text: incomeText,
      amount: +processedAmount,
    });

    setIncomeText('');
    setIncomeAmount('');
  };

  const submitExpense = (e) => {
    e.preventDefault();
    addTransaction({
      text: expenseText,
      amount: -Math.abs(expenseAmount),
    });

    setExpenseText('');
    setExpenseAmount('');
  };

  return (
    <div className="form-section">
      <h2 className="section-title">➕ Add Income</h2>
      <form onSubmit={submitIncome}>
        <div className="form-control">
          <label>Description</label>
          <input
            type="text"
            value={incomeText}
            onChange={(e) => setIncomeText(e.target.value)}
            placeholder="e.g. Salary"
            required
          />
        </div>
        <div className="form-control">
          <label>Amount (₹)</label>
          <input
            type="number"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            placeholder="e.g. 50000"
            required
          />
        </div>
        <button className="btn income-btn">Add Income</button>
      </form>

      <h2 className="section-title">➖ Add Expense</h2>
      <form onSubmit={submitExpense}>
        <div className="form-control">
          <label>Description</label>
          <input
            type="text"
            value={expenseText}
            onChange={(e) => setExpenseText(e.target.value)}
            placeholder="e.g. Rent"
            required
          />
        </div>
        <div className="form-control">
          <label>Amount (₹)</label>
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="e.g. 1500"
            required
          />
        </div>
        <button className="btn expense-btn">Add Expense</button>
      </form>
    </div>
  );
};

export default AddTransaction;
