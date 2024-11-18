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
import { fetchLedgers, getTransaction } from '../../../store/ledgerSlice';

export default function PaymentReport() {
  const dispatch = useDispatch();
  const { ledgers, status, error } = useSelector((state) => state.ledger);
  const [accounts, setAccounts] = useState(ledgers);
  const [filteredDebitAccounts, setFilteredDebitAccounts] = useState([]);
  const [filteredCreditAccounts, setFilteredCreditAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    invoiceNumber: '',
    debitAccount: null,
    creditAccount: null,
    amount: '',
  });

  const selectedVoucherType = 'Payment'; // Changed to Payment

  // Fetch ledgers and transactions on component mount
  useEffect(() => {
    dispatch(fetchLedgers());
    dispatch(getTransaction()).then((response) => {
      setTransactions(response.payload); // Assuming payload contains the transaction data
    });
  }, [dispatch]);

  // Watch for ledger updates and filter accounts
  useEffect(() => {
    setAccounts(ledgers);
  }, [ledgers]);

  // Filter Debit and Credit accounts for 'Payment'
  useEffect(() => {
    if (selectedVoucherType === 'Payment') {
      // Filter Debit Accounts
      const filteredDebit = accounts.filter(
        (account) =>
          ['Expenses (Direct)', 'Expenses (Indirect)', 'Fixed Assets', 'Bank Accounts', 'Cash-in-Hand'].includes(account?.group_id?.groupName)
      );
      setFilteredDebitAccounts(filteredDebit);

      // Filter Credit Accounts
      const filteredCredit = accounts.filter(
        (account) =>
          ['Sundry Creditors', 'Current Liabilities', 'Bank OD A/c'].includes(account?.group_id?.groupName)
      );
      setFilteredCreditAccounts(filteredCredit);
    }
  }, [accounts, selectedVoucherType]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Select input changes
  const handleSelectChange = (name) => (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data and simulate a new transaction
    const newTransaction = {
      voucherNo: '123', // Dummy value
      date: new Date().toLocaleDateString(),
      debitAccount: formData.debitAccount?.label || '',
      creditAccount: formData.creditAccount?.label || '',
      description: formData.invoiceNumber,
      debitAmount: formData.amount,
      creditAmount: formData.amount,
    };

    setTransactions((prev) => [...prev, newTransaction]); // Add to transactions
    setFormData({
      fromDate: '',
      toDate: '',
      invoiceNumber: '',
      debitAccount: null,
      creditAccount: null,
      amount: '',
    }); // Reset form data
  };

  // Helper function to format options for Select component
  const formatOptions = (accountList) => {
    return accountList.map((account) => ({
      value: account._id,
      label: account.ledger_name,
    }));
  };

  // Loading and error handling
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
              <strong>Payment</strong> <small>Report</small>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                <CCol md={4}>
                  <CFormLabel htmlFor="fromDate">From Date</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
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
                      value={formData.toDate}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback invalid>Please choose a To Date.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="invoiceNumber">Invoice Number</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="text"
                      id="invoiceNumber"
                      name="invoiceNumber"
                      placeholder="Enter Invoice Number"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback invalid>Please enter a valid Invoice Number.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="debitAccount">Debit Account</CFormLabel>
                  <Select
                    id="debitAccount"
                    name="debitAccount"
                    options={formatOptions(filteredDebitAccounts)}
                    isSearchable
                    onChange={handleSelectChange('debitAccount')}
                    required
                  />
                  <CFormFeedback invalid>Please select a Debit Account.</CFormFeedback>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="creditAccount">Credit Account</CFormLabel>
                  <Select
                    id="creditAccount"
                    name="creditAccount"
                    options={formatOptions(filteredCreditAccounts)}
                    isSearchable
                    onChange={handleSelectChange('creditAccount')}
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
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback invalid>Please enter a valid Amount.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={6} className="align-self-end">
                  <CButton color="primary" type="submit">
                    Submit
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginLeft: '20px',
                marginRight: '20px',
              }}
            >
              <div>Dr</div>
              <div><h5>Transactions</h5></div>
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
                    <CTableHeaderCell scope="col">Debit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Credit</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
  {transactions.filter(transaction => transaction.voucher_type === "Payment").length > 0 ? (
    transactions
      .filter(transaction => transaction.voucher_type === "Payment") // Filter transactions by voucher_type "Payment"
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
            <CButton color="info">View</CButton>
          </CTableDataCell>
        </CTableRow>
      ))
  ) : (
    <CTableRow>
      <CTableDataCell colSpan="8" style={{ textAlign: 'center' }}>
        No transactions found
      </CTableDataCell>
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
