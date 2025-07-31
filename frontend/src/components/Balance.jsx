import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const total = transactions.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="balance">
      <h4>Your Balance</h4>
      <h1>₹{total.toFixed(2)}</h1>
    </div>
  );
};

export default Balance;
