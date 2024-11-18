// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import { ledgerReducer } from './store/ledgerSlice'; // We'll create this next
import changeState from './store/settingsReducer'; // Create a separate file for settings

const store = configureStore({
  reducer: {
    settings: changeState, // Existing settings reducer
    ledger: ledgerReducer, // New ledger reducer
  },
});

export default store;
