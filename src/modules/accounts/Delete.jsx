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
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import axios from 'axios'
import { api } from '../../../config'

const AddVouchers = () => {
  const [accounts, setAccounts] = useState([])
  const [filteredDebitAccounts, setFilteredDebitAccounts] = useState([])
  const [filteredCreditAccounts, setFilteredCreditAccounts] = useState([])
  const [voucherType, setVoucherType] = useState('')
  const [validated, setValidated] = useState(false)
  const [formValues, setFormValues] = useState({
    voucherNo: '',
    voucherType: '',
    voucherDate: '',
    totalAmount: '',
    description: '',
    debitAccount: null,
    creditAccount: null,
  })

  // Fetch accounts from the API
  useEffect(() => {
    axios
      .get(${api}/ledger)
      .then((res) => {
        setAccounts(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  // Handle form validation and submit data to API
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      // Prepare the payload
      const payload = {
        voucher_no: formValues.voucherNo,
        voucher_type: voucherType,
        voucher_date: formValues.voucherDate,
        total_amount: formValues.totalAmount,
        description: formValues.description,
        debit_account: formValues.debitAccount.value,
        credit_account: formValues.creditAccount.value,
      }
      console.log(payload, 'hh')

      // Send the data to the API
      axios
        .post(${api}/vouchers, payload)
        .then((response) => {
          console.log('Voucher added successfully:', response.data)
        })
        .catch((error) => {
          console.error('There was an error adding the voucher:', error)
        })
    }
    setValidated(true)
  }

  // Update form values
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle voucher type change and filter accounts
  const handleVoucherTypeChange = (event) => {
    const selectedVoucherType = event.target.value
    setVoucherType(selectedVoucherType)

    if (selectedVoucherType === 'Receipt') {
      const filteredDebit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Bank Accounts' ||
          account?.group_id?.groupName === 'Cash-in-Hand',
      )
      setFilteredDebitAccounts(filteredDebit)

      const filteredCredit = accounts.filter(
        (account) =>
          account?.group_id?.groupName !== 'Bank Accounts' &&
          account?.group_id?.groupName !== 'Cash-in-Hand',
      )
      setFilteredCreditAccounts(filteredCredit)
    } else if (selectedVoucherType === 'Payment') {
      const filteredCredit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Bank Accounts' ||
          account?.group_id?.groupName === 'Cash-in-Hand',
      )
      setFilteredCreditAccounts(filteredCredit)

      const filteredDebit = accounts.filter(
        (account) =>
          account?.group_id?.groupName !== 'Bank Accounts' &&
          account?.group_id?.groupName !== 'Cash-in-Hand',
      )
      setFilteredDebitAccounts(filteredDebit)
    } else if (selectedVoucherType === 'Contra') {
      const filteredDebit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Cash-in-Hand' ||
          account?.group_id?.groupName === 'Bank Accounts' ||
          account?.group_id?.groupName === 'Bank OCC A/c' ||
          account?.group_id?.groupName === 'Bank OD A/c' ||
          account?.group_id?.groupName === 'Branch / Divisions',
      )
      setFilteredDebitAccounts(filteredDebit)

      const filteredCredit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Cash-in-Hand' ||
          account?.group_id?.groupName === 'Bank Accounts' ||
          account?.group_id?.groupName === 'Bank OCC A/c' ||
          account?.group_id?.groupName === 'Bank OD A/c' ||
          account?.group_id?.groupName === 'Branch / Divisions',
      )
      setFilteredCreditAccounts(filteredCredit)
    } else if (selectedVoucherType === 'Sales') {
      const filteredDebit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Sundry Debtors' ||
          account?.group_id?.groupName === 'Cash-in-Hand' ||
          account?.group_id?.groupName === 'Bank Accounts' ||
          account?.group_id?.groupName === 'Loans & Advances (Asset)' ||
          account?.group_id?.groupName === 'Misc. Expenses (ASSET)' ||
          account?.group_id?.groupName === 'Fixed Assets' ||
          account?.group_id?.groupName === 'Investments',
      )
      setFilteredDebitAccounts(filteredDebit)

      const filteredCredit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Sales Accounts' ||
          account?.group_id?.groupName === 'Direct Incomes' ||
          account?.group_id?.groupName === 'Income (Direct)' ||
          account?.group_id?.groupName === 'Indirect Incomes',
      )
      setFilteredCreditAccounts(filteredCredit)
    } else if (selectedVoucherType === 'Purchase') {
      const filteredDebit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Purchase Accounts' ||
          account?.group_id?.groupName === 'Expenses (Direct)' ||
          account?.group_id?.groupName === 'Expenses (Indirect)' ||
          account?.group_id?.groupName === 'Direct Expenses' ||
          account?.group_id?.groupName === 'Fixed Assets' ||
          account?.group_id?.groupName === 'Indirect Expenses',
      )
      setFilteredDebitAccounts(filteredDebit)

      const filteredCredit = accounts.filter(
        (account) =>
          account?.group_id?.groupName === 'Sundry Creditors' ||
          account?.group_id?.groupName === 'Current Liabilities' ||
          account?.group_id?.groupName === 'Duties & Taxes' ||
          account?.group_id?.groupName === 'Loans (Liability)' ||
          account?.group_id?.groupName === 'Secured Loans' ||
          account?.group_id?.groupName === 'Unsecured Loans' ||
          account?.group_id?.groupName === 'Provisions' ||
          account?.group_id?.groupName === 'Suspense A/c' ||
          account?.group_id?.groupName === 'Bank OD A/c' ||
          account?.group_id?.groupName === 'Bank Accounts' ||
          account?.group_id?.groupName === 'Cash-in-Hand' ||
          account?.group_id?.groupName === 'Bank OCC A/c',
      )
      setFilteredCreditAccounts(filteredCredit)
    } else {
      setFilteredDebitAccounts(accounts)
      setFilteredCreditAccounts(accounts)
    }
  }
  // Handle Select value change
  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta
    setFormValues((prev) => ({
      ...prev,
      [name]: selectedOption,
    }))
  }

  // Helper function to transform account data for React Select
  const formatOptions = (accountList) => {
    return accountList.map((account) => ({
      value: account._id,
      label: account.ledger_name,
    }))
  }

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Add</strong> <small>Vouchers</small>
            </CCardHeader>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={2}>
                  <CFormLabel htmlFor="voucherNo">Voucher No</CFormLabel>
                  <CFormInput
                    type="number"
                    id="voucherNo"
                    name="voucherNo"
                    required
                    value={formValues.voucherNo}
                    onChange={handleInputChange}
                  />
                  <CFormFeedback invalid>Please provide a Voucher No.</CFormFeedback>
                </CCol>

                <CCol md={2}>
                  <CFormLabel htmlFor="voucherType">Voucher Type</CFormLabel>
                  <CFormSelect
                    id="voucherType"
                    name="voucherType"
                    required
                    value={voucherType}
                    onChange={handleVoucherTypeChange}
                  >
                    <option disabled value="">
                      Choose...
                    </option>
                    <option value="Purchase">Purchase Voucher</option>
                    <option value="Sales">Sales Voucher</option>
                    <option value="Receipt">Receipt Voucher</option>
                    <option value="Payment">Payment Voucher</option>
                    <option value="Contra">Contra Voucher</option>
                    <option value="Journal">Journal Voucher</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please select a Voucher Type.</CFormFeedback>
                  <CFormFeedback valid>Looks Good!.</CFormFeedback>
                </CCol>

                <CCol md={2}>
                  <CFormLabel htmlFor="voucherDate">Voucher Date</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="date"
                      id="voucherDate"
                      name="voucherDate"
                      required
                      value={formValues.voucherDate}
                      onChange={handleInputChange}
                    />
                    <CFormFeedback invalid>Please choose a Voucher Date.</CFormFeedback>
                  </CInputGroup>
                </CCol>

                <CCol md={2}>
                  <CFormLabel htmlFor="totalAmount">Total Amount</CFormLabel>
                  <CFormInput
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    required
                    value={formValues.totalAmount}
                    onChange={handleInputChange}
                  />
                  <CFormFeedback invalid>Please provide a Total Amount.</CFormFeedback>
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormInput
                    type="text"
                    id="description"
                    name="description"
                    required
                    value={formValues.description}
                    onChange={handleInputChange}
                  />
                  <CFormFeedback invalid>Please provide a Description.</CFormFeedback>
                </CCol>

                <CCol md={3}>
                  <CFormLabel htmlFor="debitAccount">Debit Account</CFormLabel>
                  <Select
                    id="debitAccount"
                    name="debitAccount"
                    options={formatOptions(filteredDebitAccounts)}
                    isSearchable
                    required
                    value={formValues.debitAccount}
                    onChange={handleSelectChange}
                  />
                  <CFormFeedback invalid>Please select a Debit Account.</CFormFeedback>
                </CCol>

                <CCol md={3}>
                  <CFormLabel htmlFor="creditAccount">Credit Account</CFormLabel>
                  <Select
                    id="creditAccount"
                    name="creditAccount"
                    options={formatOptions(filteredCreditAccounts)}
                    isSearchable
                    required
                    value={formValues.creditAccount}
                    onChange={handleSelectChange}
                  />
                  <CFormFeedback invalid>Please select a Credit Account.</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default AddVouchers