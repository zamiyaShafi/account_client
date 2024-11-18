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
// import { DocsExample } from 'src/components'
import { Link } from 'react-router-dom'
import LedgerReport from './LedgerReport'
import PurchaseReport from './VocherReport/PurchaseReport'
import SalesReport from './VocherReport/SalesReport'
import ReciptReport from './VocherReport/ReciptReport'
import PaymentReport from './VocherReport/PaymentReport'
import ContraReport from './VocherReport/ContraReport'
import JournalReport from './VocherReport/JournalReport'

function Vouchers() {
  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader     style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
            <strong>Manage Vouchers</strong> <small>Voucher Report</small>
            </div>
            <CButton color="primary" shape="rounded-0" >

              <CTooltip
                content="Add New Vouchers Here"
                placement="bottom"
              >
             <Link to="/accounts/add-voucher" style={{ textDecoration: 'none', color: 'inherit' }}>
                Add
              </Link>
              </CTooltip>
            </CButton>
          </CCardHeader>

          <CTabs activeItemKey="profile">
            <CTabList variant="tabs">
         
              <CTab itemKey="purchase">Purchase</CTab>
              <CTab itemKey="sales">Sales</CTab>
              <CTab itemKey="recipt">Recipt</CTab>
              <CTab itemKey="payment">Payment</CTab>
              <CTab itemKey="contra"> Contra Voucher</CTab>
              <CTab itemKey="journal">Journal Voucher</CTab>

            </CTabList>
            <CTabContent>
              <CTabPanel className="p-3" itemKey="all">

          {/* <CCardBody>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">2</CTableHeaderCell>
                    <CTableDataCell>Jacob</CTableDataCell>
                    <CTableDataCell>Thornton</CTableDataCell>
                    <CTableDataCell>@fat</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableHeaderCell scope="row">3</CTableHeaderCell>
                    <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
                    <CTableDataCell>@twitter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
         
          </CCardBody> */}
          </CTabPanel>

          <CTabPanel className="p-3" itemKey="purchase">
          <PurchaseReport/>
          </CTabPanel>

          <CTabPanel className="p-3" itemKey="sales">
          <SalesReport/>
          </CTabPanel>

          <CTabPanel className="p-3" itemKey="recipt">
          <ReciptReport/>
          </CTabPanel>

          <CTabPanel className="p-3" itemKey="payment">
          <PaymentReport/>
          </CTabPanel>

          <CTabPanel className="p-3" itemKey="contra">
          <ContraReport/>
          </CTabPanel>

          <CTabPanel className="p-3" itemKey="journal">
          <JournalReport/>
          </CTabPanel>


          

</CTabContent>
</CTabs>
        </CCard>
      </CCol>
    </div>
  )
}

export default Vouchers
