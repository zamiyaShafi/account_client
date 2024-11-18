import React, { useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CTooltip,
  CTabs,
  CTabContent,
  CTabPane,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLedgers } from '../../store/ledgerSlice'; // Adjust the path as needed
import LedgerReport from './LedgerReport';

function Ledger() {
  const dispatch = useDispatch();
  const { ledgers, status, error } = useSelector((state) => state.ledger);

  useEffect(() => {
    dispatch(fetchLedgers());
  }, [dispatch]);

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

          <CTabs activeTab="all">
            <CTabContent>
              <CTabPane visible={true} tabId="all">
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
                      {status === 'loading' ? (
                        <CTableRow>
                          <CTableDataCell colSpan="6">Loading...</CTableDataCell>
                        </CTableRow>
                      ) : status === 'failed' ? (
                        <CTableRow>
                          <CTableDataCell colSpan="6">Error: {error}</CTableDataCell>
                        </CTableRow>
                      ) : ledgers.length > 0 ? (
                        ledgers.map((item, index) => (
                          <CTableRow key={item.id}> {/* Use a unique key */} 
                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                            <CTableDataCell>{item.ledger_name}</CTableDataCell>
                            <CTableDataCell>{item.group_id?.groupName}</CTableDataCell>
                            <CTableDataCell>{item.opening_balance}</CTableDataCell>
                            <CTableDataCell>{item.current_balance}</CTableDataCell>
                            <CTableDataCell>{item.balance_type}</CTableDataCell>
                          </CTableRow>
                        ))
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan="6">No Data Found</CTableDataCell>
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CTabPane>

              <CTabPane tabId="report">
                <LedgerReport />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCard>
      </CCol>
    </div>
  );
}

export default Ledger;
