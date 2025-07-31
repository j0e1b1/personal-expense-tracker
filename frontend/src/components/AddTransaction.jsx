import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {
  const { addTransaction } = useContext(GlobalContext);

  // For income
  const [incomeText, setIncomeText] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  // For expense
  const [expenseText, setExpenseText] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const submitIncome = (e) => {
    e.preventDefault();
    addTransaction({
      text: incomeText,
      amount: +Math.abs(incomeAmount)
    });
    setIncomeText('');
    setIncomeAmount('');
  };

  const submitExpense = (e) => {
    e.preventDefault();
    addTransaction({
      text: expenseText,
      amount: -Math.abs(expenseAmount)
    });
    setExpenseText('');
    setExpenseAmount('');
  };

  return (
    <div>
      <h3>Add Income</h3>
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
          <label>Amount</label>
          <input
            type="number"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            placeholder="e.g. 5000"
            required
          />
        </div>
        <button className="btn">Add Income</button>
      </form>

      <h3>Add Expense</h3>
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
          <label>Amount</label>
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="e.g. 1500"
            required
          />
        </div>
        <button className="btn">Add Expense</button>
      </form>
    </div>
  );
};

export default AddTransaction;
