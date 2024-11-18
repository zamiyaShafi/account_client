import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../../config'; // Adjust path as needed

// Thunk to fetch ledgers
export const fetchLedgers = createAsyncThunk('ledger/fetchLedgers', async () => {
  const response = await axios.get(`${api}/ledger`);
  return response.data.data; // Adjust based on your API response structure
});

// Thunk to submit a new voucher (Post API)
export const submitVoucher = createAsyncThunk('vouchers/submitVoucher', async (voucherData) => {
  const response = await axios.post(`${api}/vouchers`, voucherData);
  return response.data; // Adjust based on your API response structure
});

// Thunk to submit a new Ledger (Post API)
export const submitLedger = createAsyncThunk('ledger/submitLedger', async (ledgerData) => {
  const response = await axios.post(`${api}/ledger`, ledgerData);
  return response.data; // Adjust based on your API response structure
});

// Thunk to fetch account groups
export const fetchGroup = createAsyncThunk('ledger/fetchGroup', async () => {
  const response = await axios.get(`${api}/account-groups`);
  return response.data.groups; // Adjust based on your API response structure
});

// Thunk to submit a new ledger-transactions (Post API)
export const submitTransactions = createAsyncThunk('ledger/submitTransactions', async (transactionsData) => {
  const response = await axios.post(`${api}/ledger-transactions`, transactionsData);
  return {
    credit_transactions: response.data.credit_transactions,
    debit_transactions: response.data.debit_transactions,
  }; // Adjust based on your API response structure
});

// Thunk to fetch ledger transactions
export const getTransaction = createAsyncThunk('ledger/getTransaction', async () => {
  const response = await axios.get(`${api}/getledger-transactions`);
  return response.data.data; // Adjust based on your API response structure
});

// Thunk to fetch filtered ledger transactions
// Thunk to fetch filtered ledger transactions
export const fetchFilteredTransactions = createAsyncThunk(
  'ledger/fetchFilteredTransactions',
  async (filterParams) => {
    const response = await axios.get(`${api}/getledger-FilterTransaction`, {
      params: filterParams,
    });
    return response.data; // Ensure this matches your API response structure
  }
);

const ledgerSlice = createSlice({
  name: 'ledger',
  initialState: {
    ledgers: [],
   
    filteredLedgers: [],
     // Add a new state for filtered ledgers
    status: 'idle',
    error: null,
    voucherStatus: 'idle',
    voucherError: null,
    LedgerStatus: 'idle',
    LedgerError: null,
    groups: [],
    Groupstatus: 'idle',
    Grouperror: null,
    Transactions: [],
    TransactionsStatus: 'idle',
    TransactionsError: null,
  },
 
  extraReducers: (builder) => {
    builder
      // Handle fetchLedgers
      .addCase(fetchLedgers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLedgers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ledgers = action.payload;
        state.filteredLedgers = action.payload; // Initialize filtered ledgers with all ledgers
      })
      .addCase(fetchLedgers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle submitVoucher
      .addCase(submitVoucher.pending, (state) => {
        state.voucherStatus = 'loading';
      })
      .addCase(submitVoucher.fulfilled, (state) => {
        state.voucherStatus = 'succeeded';
      })
      .addCase(submitVoucher.rejected, (state, action) => {
        state.voucherStatus = 'failed';
        state.voucherError = action.error.message;
      })
      // Handle submitLedger
      .addCase(submitLedger.pending, (state) => {
        state.LedgerStatus = 'loading';
      })
      .addCase(submitLedger.fulfilled, (state) => {
        state.LedgerStatus = 'succeeded';
      })
      .addCase(submitLedger.rejected, (state, action) => {
        state.LedgerStatus = 'failed';
        state.LedgerError = action.error.message;
      })
      // Handle fetchGroup
      .addCase(fetchGroup.pending, (state) => {
        state.Groupstatus = 'loading';
      })
      .addCase(fetchGroup.fulfilled, (state, action) => {
        state.Groupstatus = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchGroup.rejected, (state, action) => {
        state.Groupstatus = 'failed';
        state.Grouperror = action.error.message;
      })
      // Handle submitTransactions
      .addCase(submitTransactions.pending, (state) => {
        state.TransactionsStatus = 'loading';
      })
      .addCase(submitTransactions.fulfilled, (state) => {
        state.TransactionsStatus = 'succeeded';
      })
      .addCase(submitTransactions.rejected, (state, action) => {
        state.TransactionsStatus = 'failed';
        state.TransactionsError = action.error.message;
      })
      // Handle getTransaction
      .addCase(getTransaction.pending, (state) => {
        state.TransactionsStatus = 'loading';
      })
      .addCase(getTransaction.fulfilled, (state, action) => {
        state.TransactionsStatus = 'succeeded';
        state.Transactions = action.payload;
        state.filteredLedgers = action.payload; // Initialize filtered ledgers with all transactions
      })
      .addCase(getTransaction.rejected, (state, action) => {
        state.TransactionsStatus = 'failed';
        state.TransactionsError = action.error.message;
      })

       // Handle fetchFilteredTransactions
  .addCase(fetchFilteredTransactions.pending, (state) => {
    state.TransactionsStatus = 'loading';
  })
  .addCase(fetchFilteredTransactions.fulfilled, (state, action) => {
    state.TransactionsStatus = 'succeeded';
    state.filteredLedgers = action.payload; // Store filtered transactions in state
  })
  .addCase(fetchFilteredTransactions.rejected, (state, action) => {
    state.TransactionsStatus = 'failed';
    state.TransactionsError = action.error.message;
  });
  },
});


export const ledgerReducer = ledgerSlice.reducer;
