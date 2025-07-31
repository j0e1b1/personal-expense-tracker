import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  // Income
  const [incomeText, setIncomeText] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState('');

  // Expense
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

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
      date: incomeDate,
      type: 'income'
    });

    setIncomeText('');
    setIncomeAmount('');
    setIncomeDate('');
  };

  const submitExpense = (e) => {
    e.preventDefault();

    addTransaction({
      text: expenseCategory,
      amount: -Math.abs(expenseAmount),
      date: expenseDate,
      type: 'expense'
    });

    setExpenseCategory('');
    setExpenseAmount('');
    setExpenseDate('');
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
          <label>Category</label>
          <select
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Rent">Rent</option>
            <option value="Others">Others</option>
          </select>
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
        <div className="form-control">
          <label>Date</label>
          <input
            type="date"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
          />
        </div>
        <button className="btn expense-btn">Add Expense</button>
      </form>
    </div>
  );
};

export default AddTransaction;
