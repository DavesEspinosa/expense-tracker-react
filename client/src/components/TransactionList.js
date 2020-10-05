import React, { useContext, useEffect } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

//useEffect for asuncronous calls.
export const TransactionList = () => {
  // we had an array of 4 objects
  const { transactions, getTransactions } = useContext(GlobalContext);
  console.log(transactions);

  //To avoid an infinite loop, we put an empty array after de function
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};
