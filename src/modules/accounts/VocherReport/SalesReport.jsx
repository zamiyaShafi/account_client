import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLedgers, getTransaction, fetchFilteredTransactions } from '../../../store/ledgerSlice'; 
import { api } from '../../../../config.js';
import axios from 'axios';

export default function SalesReport() {
  const dispatch = useDispatch();
  const { ledgers, status, error } = useSelector((state) => state.ledger);
  const [accounts, setAccounts] = useState(ledgers);
  const [filteredDebitAccounts, setFilteredDebitAccounts] = useState([]);
  const [filteredCreditAccounts, setFilteredCreditAccounts] = useState([]);
  const selectedVoucherType = 'Sales';
  const [data, setData] = useState({
    fromDate: '',
    toDate: '',
    voucherNumber: '',
    debitAccount: '',
    creditAccount: '',
    amount: ''
  });
  const [transactions, setTransactions] = useState([]);

  // Fetch ledgers and transactions when component mounts
  useEffect(() => {
    dispatch(fetchLedgers());
    dispatch(getTransaction()).then((response) => {
      setTransactions(response.payload);  // Assuming payload contains the transaction data
    });
  }, [dispatch]);

  // Filter accounts for Debit and Credit based on the voucher type
  useEffect(() => {
    if (selectedVoucherType === 'Sales') {
      const filteredDebit = accounts.filter((account) =>
        ['Sales Accounts', 'Revenue', 'Income'].includes(account?.group_id?.groupName)
      );
      setFilteredDebitAccounts(filteredDebit);

      const filteredCredit = accounts.filter((account) =>
        ['Sundry Debtors', 'Current Assets', 'Bank Accounts'].includes(account?.group_id?.groupName)
      );
      setFilteredCreditAccounts(filteredCredit);
    }
  }, [accounts, selectedVoucherType]);

  // Helper function to format options for Select component
  const formatOptions = (accountList) => {
    return accountList.map((account) => ({
      value: account._id,
      label: account.ledger_name,
    }));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle select input changes
  const handleSelectChange = (selectedOption, actionMeta) => {
    setData({ ...data, [actionMeta.name]: selectedOption.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create filterParams object from the data
      const filterParams = {
        fromDate: data.fromDate,
        toDate: data.toDate,
        voucherNumber: data.voucherNumber,
        debitAccount: data.debitAccount,
        creditAccount: data.creditAccount,
        amount: data.amount,
        voucher_type: "Sales",
      };

      // Dispatch the fetchFilteredTransactions thunk with the filter parameters
      const resultAction = await dispatch(fetchFilteredTransactions(filterParams));

      if (fetchFilteredTransactions.fulfilled.match(resultAction)) {
        console.log("Filtered transactions fetched successfully", resultAction.payload);
        // Optionally, update the local state with fetched transactions
        setTransactions(resultAction.payload); // Update state if necessary
      } else {
        console.error('Error fetching filtered transactions:', resultAction.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // Handle possible loading or error state
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Sales</strong> <small>Report</small>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 needs-validation" noValidate>
                <CCol md={4}>
                  <CFormLabel htmlFor="fromDate">From Date</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      onChange={handleChange}
                      required
                    />
                    <CFormFeedback invalid>Please choose a From Date.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="toDate">To Date</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="date"
                      id="toDate"
                      name="toDate"
                      onChange={handleChange}
                      required
                    />
                    <CFormFeedback invalid>Please choose a To Date.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="voucherNumber">Voucher Number</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="text"
                      id="voucherNumber"
                      name="voucherNumber"
                      onChange={handleChange}
                      placeholder="Enter Voucher Number"
                      required
                    />
                    <CFormFeedback invalid>Please enter a valid Voucher Number.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="debitAccount">Debit Account</CFormLabel>
                  <Select
                    id="debitAccount"
                    name="debitAccount"
                    onChange={handleSelectChange}
                    options={formatOptions(filteredDebitAccounts)}
                    isSearchable
                    required
                  />
                  <CFormFeedback invalid>Please select a Debit Account.</CFormFeedback>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="creditAccount">Credit Account</CFormLabel>
                  <Select
                    id="creditAccount"
                    name="creditAccount"
                    onChange={handleSelectChange}
                    options={formatOptions(filteredCreditAccounts)}
                    isSearchable
                    required
                  />
                  <CFormFeedback invalid>Please select a Credit Account.</CFormFeedback>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="amount">Amount</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="text"
                      id="amount"
                      name="amount"
                      onChange={handleChange}
                      placeholder="Amount"
                      required
                    />
                    <CFormFeedback invalid>Please enter a valid Amount.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={6} className="align-self-end">
                  <CButton color="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px' }}>
              <div>Dr</div>
              <div><h5>Heading</h5></div>
              <div>Cr</div>
            </div>

            <CCardBody style={{ display: 'flex' }}>
              <CTable style={{ border: '2px solid black' }}>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Voucher No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Dr. Account</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cr. Account</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Debit Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Credit Amount</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {transactions.filter(transaction => transaction.voucher_type === "Sales").length > 0 ? (
                    transactions
                      .filter(transaction => transaction.voucher_type === "Sales") // Filter transactions by voucher_type
                      .map((transaction, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell>{transaction.voucher_no}</CTableDataCell>
                          <CTableDataCell>{transaction.voucher_date}</CTableDataCell>
                          <CTableDataCell>{transaction.debit_account.ledger_name}</CTableDataCell>
                          <CTableDataCell>{transaction.credit_account.ledger_name}</CTableDataCell>
                          <CTableDataCell>{transaction.description}</CTableDataCell>
                          <CTableDataCell>{transaction.debit_amount}</CTableDataCell>
                          <CTableDataCell>{transaction.credit_amount}</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="danger">Delete</CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={8} className="text-center">No Transactions Available</CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
}
