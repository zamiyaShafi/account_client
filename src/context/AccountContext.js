import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
import { api } from '../../config';

// Create the Account context
export const AccountContext = createContext();

// Create a provider component to wrap around your app
export const AccountProvider = ({ children }) => {

 // This is your shared state
 const [ledgerData, setLedgerData] = useState(["ss","ss"]);

  // Fetch ledger data from the API
//   useEffect(() => {
//     const fetchLedgerData = async () => {
//       try {
//         const response = await axios.get(`${api}/ledger`);
//         setLedgerData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching ledger data:', error);
//       }
//     };
//     fetchLedgerData();
//   }, []); 
 

 return(
    <AccountContext.Provider value={{ledgerData}}>

        {children}

    </AccountContext.Provider>
 )

}