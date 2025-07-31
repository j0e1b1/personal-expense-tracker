import React, { createContext, useReducer } from 'react';

const initialState = {
  transactions: [],
  budget: 0,
};

export const GlobalContext = createContext(initialState);

function AppReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload
      };
    default:
      return state;
  }
}

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addTransaction(transaction) {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  }

  function setBudget(amount) {
    dispatch({ type: 'SET_BUDGET', payload: amount });
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      budget: state.budget,
      addTransaction,
      setBudget
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
