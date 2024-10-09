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
  CTooltip
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { Link } from 'react-router-dom'

function Vouchers() {
  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader     style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
            <strong>Manage Vouchers</strong> <small>Table head</small>
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

          <CCardBody>
            <p className="text-body-secondary small">
              Similar to tables and dark tables, use the modifier prop{' '}
              <code>color=&#34;light&#34;</code> or <code>color=&#34;dark&#34;</code> to make{' '}
              <code>&lt;CTableHead&gt;</code>s appear light or dark gray.
            </p>

            <DocsExample href="components/table#table-head">
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
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}

export default Vouchers
