"use client";

import { createContext, useReducer, ReactNode } from "react";
import reducers from "./Reducers";

// Create the context with a default value
export const DataContext = createContext<any>(undefined);

// Define the type for the provider props
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const initialState = {
    requestLoanModal:false,
    repayLoanModal:false,
    callback: false,
    openSidebar:false,
    addMoneyModal:false,
    user:{},
    token:""
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
