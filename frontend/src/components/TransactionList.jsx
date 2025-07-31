import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((t, index) => (
          <li key={index} className={t.amount < 0 ? 'minus' : 'plus'}>
            {t.text} <span>₹{t.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;