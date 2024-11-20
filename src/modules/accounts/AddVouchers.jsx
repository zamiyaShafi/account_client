  import React, { useState, useEffect } from 'react';
  import {
    CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback,
    CFormInput, CFormLabel, CFormSelect, CRow
  } from '@coreui/react';
  import Select from 'react-select';
  import { useDispatch, useSelector } from 'react-redux';
  import { submitVoucher, fetchLedgers } from '../../store/ledgerSlice'; // Import actions

  const AddVouchers = () => {
    const dispatch = useDispatch();
    const { ledgers: accounts, status, error } = useSelector((state) => state.ledger);

    const [voucherType, setVoucherType] = useState('');
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValues] = useState({
      voucherNo: '',
      voucherType: '',
      voucherDate: '',
      totalAmount: '',
      description: '',
      debitAccount: null,
      creditAccount: null,
    });

    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchLedgers()); // Fetch ledgers (accounts) when component loads
      }
    }, [status, dispatch]);

    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        const payload = {
          voucher_no: formValues.voucherNo,
          voucher_type: voucherType,
          voucher_date: formValues.voucherDate,
          total_amount: formValues.totalAmount,
          description: formValues.description,
          debit_account: formValues.debitAccount.value,
          credit_account: formValues.creditAccount.value,
        };

        // Dispatch submitVoucher action
        dispatch(submitVoucher(payload));
      }
      setValidated(true);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      })); 
    }; 

    const handleVoucherTypeChange = (event) => {
      const selectedVoucherType = event.target.value;
      setVoucherType(selectedVoucherType);
    }; 

    const handleSelectChange = (selectedOption, actionMeta) => {
      const { name } = actionMeta;
      setFormValues((prev) => ({
        ...prev,
        [name]: selectedOption,
      })); 
    }; 

    const formatOptions = (accountList) => {
      return accountList.map((account) => ({
        value: account._id,
        label: account.ledger_name,
      })); 
    }; 

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
                  <CCol md={6}>
                    <CFormLabel htmlFor="voucherNo">Voucher No</CFormLabel>
                    <CFormInput
                      type="text"
                      id="voucherNo"
                      name="voucherNo"
                      value={formValues.voucherNo}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback invalid>Please provide a valid voucher number.</CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="voucherDate">Voucher Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="voucherDate"
                      name="voucherDate"
                      value={formValues.voucherDate}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback invalid>Please provide a valid date.</CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="voucherType">Voucher Type</CFormLabel>
                    <CFormSelect
                      id="voucherType"
                      name="voucherType"
                      value={voucherType}
                      onChange={handleVoucherTypeChange}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="Receipt">Receipt</option>
                      <option value="Payment">Payment</option>
                      <option value="Sales">Sales</option>

                      <option value="Purchase">Purchase</option>
                      <option value="Journal">Journal</option>
                      <option value="Contra">Contra</option>

                    </CFormSelect>
                    <CFormFeedback invalid>Please select a voucher type.</CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="totalAmount">Total Amount</CFormLabel>
                    <CFormInput
                      type="number"
                      id="totalAmount"
                      name="totalAmount"
                      value={formValues.totalAmount}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback invalid>Please provide a valid amount.</CFormFeedback>
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel htmlFor="description">Description</CFormLabel>
                    <CFormInput
                      type="text"
                      id="description"
                      name="description"
                      value={formValues.description}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback invalid>Please provide a description.</CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="debitAccount">Debit Account</CFormLabel>
                    <Select
                      id="debitAccount"
                      name="debitAccount"
                      options={formatOptions(accounts)}
                      onChange={handleSelectChange}
                    />
                    <CFormFeedback invalid>Please select a debit account.</CFormFeedback>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="creditAccount">Credit Account</CFormLabel>
                    <Select
                      id="creditAccount"
                      name="creditAccount"
                      options={formatOptions(accounts)}
                      onChange={handleSelectChange}
                    />
                    <CFormFeedback invalid>Please select a credit account.</CFormFeedback>
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
    );
  };

  export default AddVouchers;
