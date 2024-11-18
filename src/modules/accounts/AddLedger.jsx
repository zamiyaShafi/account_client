import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import axios from 'axios'
import { api } from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGroup, submitLedger } from '../../store/ledgerSlice'

const LedgerForm = ({ selectedGroup, handleSubmit, validated, nature, setNature }) => {
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* Ledger Name */}
      <CCol md={6}>
        <CFormLabel htmlFor="ledgerName">Ledger Name</CFormLabel>
        <CFormInput type="text" id="ledgerName" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
        <CFormFeedback invalid>Please fill out this field!</CFormFeedback>
      </CCol>

      {/* Group Name (Read-Only) */}
      <CCol md={6}>
        <CFormLabel htmlFor="groupName">Group Name</CFormLabel>
        <CFormInput type="text" id="groupName" value={selectedGroup.groupName} readOnly required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
        <CFormFeedback invalid>Please fill out this field!</CFormFeedback>
      </CCol>

      {/* Opening Balance */}
      <CCol md={6}>
        <CFormLabel htmlFor="openingBalance">Opening Balance</CFormLabel>
        <CFormInput type="number" id="openingBalance" defaultValue={0} required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>

      {/* Balance Type */}
      <CCol md={6}>
        <CFormLabel htmlFor="balanceType">Balance Type</CFormLabel>
        <div style={{ display: 'flex', gap: '20px' }}>
          <CFormCheck
            type="radio"
            name="balanceType"
            id="radioCredit"
            label="Credit"
            checked={nature === 'Credit'}
            onChange={() => setNature('Credit')}
          />
          <CFormCheck
            type="radio"
            name="balanceType"
            id="radioDebit"
            label="Debit"
            checked={nature === 'Debit'}
            onChange={() => setNature('Debit')}
          />
        </div>
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>

      {/* Description */}
      <CCol md={12}>
        <CFormLabel htmlFor="description">Description</CFormLabel>
        <CFormInput type="text" id="description" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>

      {/* Submit Button */}
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

const AddLedger = () => {
  const [accountGroups, setAccountGroups] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState({ groupId: '', groupName: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [validated, setValidated] = useState(false)
  const [nature, setNature] = useState('') // State for nature

  const dispatch = useDispatch()
  const { groups, Groupstatus, Grouperror } = useSelector((state) => state.ledger)

  useEffect(() => {
    if (Groupstatus === 'idle') {
      dispatch(fetchGroup()) // Fetch groups only if the status is 'idle'
    }
  }, [dispatch, Groupstatus])

  useEffect(() => {
    if (groups) {
      setAccountGroups(groups) // Store fetched groups in state
      setFilteredGroups(groups.slice(0, 10)) // Initially show first 10 groups
    }
  }, [groups])

  // Handle group selection
  const handleGroupSelect = (groupId, groupName, nature) => {
    setSelectedGroup({ groupId, groupName }) // Store both group ID and name
    setNature(nature) // Set nature when a group is selected
  }

  // Handle search query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)
    const filtered = accountGroups.filter((group) => group.groupName.toLowerCase().includes(query))
    setFilteredGroups(filtered.slice(0, showAll ? filtered.length : 10)) // Show all if "Show All" is clicked
  }

  // Handle show all button click
  const handleShowAll = () => {
    setShowAll(true)
    setFilteredGroups(accountGroups) // Show all groups
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
 
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
       event.stopPropagation();
    } else {
       const ledgerData = {
          ledgerName: form.ledgerName.value,
          groupId: selectedGroup.groupId,
          openingBalance: form.openingBalance.value,
          balanceType: nature,
          description: form.description.value,
       }; 
       
       dispatch(submitLedger(ledgerData))
         .then(() => {
             form.reset();
             setValidated(false);
             setSelectedGroup({ groupId: '', groupName: '' });
             setNature('');
         })
         .catch((error) => {
             console.error('Error creating ledger:', error);
         });
    }
    setValidated(true);
 };
 

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <CCol xs={8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ledger</strong> <small>Creation</small>
          </CCardHeader>
          <CCardBody>
            <LedgerForm
              selectedGroup={selectedGroup}
              handleSubmit={handleSubmit}
              validated={validated}
              nature={nature} // Pass nature to the LedgerForm component
              setNature={setNature} // Pass setNature to the LedgerForm component
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={4}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Choose Account Groups</strong>
          </CCardHeader>
          <CCardBody
            style={{
              maxHeight: showAll ? '400px' : 'auto',
              overflowY: showAll ? 'auto' : 'hidden',
            }}
          >
            <CTable>
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell scope="col">Group Name</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">
                        <CFormCheck
                          type="radio"
                          name="groupRadio"
                          id={`radioCheck${index}`}
                          label={item.groupName}
                          checked={selectedGroup.groupName === item.groupName}
                          onChange={() => handleGroupSelect(item._id, item.groupName, item.nature)} // Update nature and set group ID
                        />
                      </CTableHeaderCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableHeaderCell colSpan="1">No Groups Found</CTableHeaderCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
            {/* Search Bar */}
            <CInputGroup className="mt-3">
              <CInputGroupText>Search</CInputGroupText>
              <CFormInput
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </CInputGroup>
            {/* Show All Button */}
            {!showAll && (
              <CButton color="primary" className="mt-3" onClick={handleShowAll}>
                Show All
              </CButton>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}

export default AddLedger
