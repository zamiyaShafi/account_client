import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CTooltip,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { Link } from 'react-router-dom'
import { api } from '../../../config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import LedgerReport from './LedgerReport'

function Ledger() {
  const [ledgers, setLedgers] = useState([])
  useEffect(() => {
    axios
      .get(`${api}/ledger`)
      .then((res) => {
        console.log(res.data.data)
        setLedgers(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <strong>Manage Ledger</strong> <small>Ledger Data</small>
            </div>
            <CButton color="primary" shape="rounded-0">
              <CTooltip content="Add New Ledger Here" placement="bottom">
                <Link
                  to="/accounts/add-ledger"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Add
                </Link>
              </CTooltip>
            </CButton>
          </CCardHeader>

          <CTabs activeItemKey="all">
            <CTabList variant="tabs" >
              <CTab itemKey="all">All</CTab>
              <CTab itemKey="report">Ledger Report</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="p-3" itemKey="all" >
                <CCardBody>
                  <CTable>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Ledger Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Group Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Opening Balance</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Current Balance</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Balance Type</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {ledgers.length > 0 ? (
                        ledgers.map((item, index) => (
                          <CTableRow>
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{item.ledger_name}</CTableDataCell>
                            <CTableDataCell>{item.group_id?.groupName}</CTableDataCell>
                            <CTableDataCell>{item.opening_balance}</CTableDataCell>
                            <CTableDataCell>{item.current_balance}</CTableDataCell>
                            <CTableDataCell>
  {item.current_balance < 0 ? 'Credit' : item.balance_type}
</CTableDataCell>

                          </CTableRow>
                        ))
                      ) : (
                        <>No Data Found</>
                      )}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="report">

                <LedgerReport/>
               
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCard>
      </CCol>
    </div>
  )
}

export default Ledger
