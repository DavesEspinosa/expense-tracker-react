import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

//create context
export const GlobalContext = createContext(initialState);

// Create the provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispacth] = useReducer(AppReducer, initialState);

  //Actions to make the call to our reducer
  //we put these to integrate the backend here, and because we get proxy at package.json, we don't have to put localhost...
  async function getTransactions() {
    try {
      const response = await axios.get("/api/v1/transactions");

      dispacth({
        type: "GET_TRANSACTIONS",
        payload: response.data.data,
      });
    } catch (error) {
      dispacth({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispacth({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispacth({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/api/v1/transactions",
        transaction,
        config
      );
      dispacth({
        type: "ADD_TRANSACTION",
        payload: response.data.data,
      });
      console.log(response);
    } catch (error) {
      dispacth({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
