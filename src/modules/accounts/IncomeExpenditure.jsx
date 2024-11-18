import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'
import Select from 'react-select'
import axios from 'axios'
import { api } from '../../../config'

const IncomeExpenditure = () => {
  const [accounts, setAccounts] = useState([])
  const [formData, setFormData] = useState({
    fromDate: null,
    toDate: null,
    ledgerAccount: null, // Selected account will be an object
  })

  const [reportData, setReportData] = useState([])
  const [debitData, setDebitData] = useState([])
  const [creditData, setCreditData] = useState([])
  const [debitBalance, setDebitBalance] = useState(0)
  const [creditBalance, setCreditBalance] = useState(0)
  const [openingBalance, setOpeningBalance] = useState(0)
  const [balanceType, setBalanceType] = useState('')
  const [ledgerAccount, setLedgerAccount] = useState('')
  // Fetch accounts from the API
  useEffect(() => {
    axios
      .get(`${api}/ledger`)
      .then((res) => {
        setAccounts(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (openingBalance > 0 && balanceType === 'Debit') {
      setCreditBalance((prevBalance) => prevBalance + openingBalance)
    } else if (openingBalance > 0 && balanceType === 'Credit') {
      setDebitBalance((prevBalance) => prevBalance + openingBalance)
    }
  }, [openingBalance, balanceType, setCreditBalance, setDebitBalance])

  // Format options for react-select
  const formatOptions = (accounts) => {
    return accounts.map((account) => ({
      value: account._id,
      label: account.ledger_name,
    }))
  }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Handle Select input change
  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      ledgerAccount: selectedOption,
    })
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()

    const { fromDate, toDate, ledgerAccount } = formData

    if (!ledgerAccount) {
      alert('Please Choose Ledger Account fields!')
      return
    }

    // Submit the data to the API
    axios
      .post(`${api}/ledger-transactions`, {
        fromDate,
        toDate,
        ledgerId: ledgerAccount.value, // Send the selected account ID
      })
      .then((res) => {
        console.log(res.data, 'data')

        setOpeningBalance(res.data.ledgerData.opening_balance)
        setBalanceType(res.data.ledgerData.balance_type)
        setLedgerAccount(res.data.ledgerData.ledger_name)

        setCreditData(res.data.credit_transactions)
        setDebitData(res.data.debit_transactions)

        const totalDebit = res.data.debit_transactions.reduce(
          (acc, item) => acc + parseFloat(item.debit_amount),
          0,
        )
        const totalCredit = res.data.credit_transactions.reduce(
          (acc, item) => acc + parseFloat(item.credit_amount),
          0,
        )

        setDebitBalance(totalDebit)
        setCreditBalance(totalCredit)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Filter</strong> <small>Ledger</small>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                <CCol md={3}>
                  <CFormLabel htmlFor="fromDate">From Date</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleChange}
                      required
                    />
                    <CFormFeedback invalid>Please choose a From Date.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={3}>
                  <CFormLabel htmlFor="toDate">To Date</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CFormInput
                      type="date"
                      id="toDate"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleChange}
                      required
                    />
                    <CFormFeedback invalid>Please choose a To Date.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={3} className="align-self-end">
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
              <div>
                <h5>{ledgerAccount}</h5>
              </div>
              <div>Cr</div>
            </div>

            <CCardBody style={{ display: 'flex' }}>
              <CTable style={{ border: '2px solid black' }}>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Expenditure</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>

                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell style={{ border: '1px solid black' }}>
                      To Expense a/c
                    </CTableDataCell>

                    <CTableDataCell style={{ border: '1px solid black' }}>10000</CTableDataCell>
                    <CTableDataCell style={{ border: '1px solid black' }}>10000</CTableDataCell>
                  </CTableRow>


                  <CTableRow>
                    <CTableDataCell style={{ border: '1px solid black' }}>
                 Excess of Income Over Expense
                    </CTableDataCell>

                    <CTableDataCell style={{ border: '1px solid black' }}></CTableDataCell>
                    <CTableDataCell style={{ border: '1px solid black' }}>10000</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>

              {/* Additional table (for credits or similar) */}
              <CTable style={{ border: '2px solid black' }}>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Income</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>

                    <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell style={{ border: '1px solid black' }}>
                      By Income a/c
                    </CTableDataCell>

                    <CTableDataCell style={{ border: '1px solid black' }}>10000</CTableDataCell>
                    <CTableDataCell style={{ border: '1px solid black' }}>10000</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell style={{ border: '1px solid black' }}>
                 Excess of Expenditure Over Income
                    </CTableDataCell>

                    <CTableDataCell style={{ border: '1px solid black' }}></CTableDataCell>
                    <CTableDataCell style={{ border: '1px solid black' }}>10000</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default IncomeExpenditure
