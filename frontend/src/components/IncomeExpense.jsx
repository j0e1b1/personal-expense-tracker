import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);
  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">₹{income.toFixed(2)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">₹{Math.abs(expense).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default IncomeExpense;