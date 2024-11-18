import React from 'react'
import {
  CCard,

  CCardHeader,
  CCol,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'
import IncomeExpenditure from './IncomeExpenditure'
import RecieptPayment from './RecieptPayment'
import CashBook from './CashBook'
import BalanceSheet from './BalanceSheet'
import TrialBalance from './TrialBalance'



function Report() {

 
  return (
    <div>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <strong>Manage Report</strong> <small>Report Data</small>
            </div>
            
          </CCardHeader>

          <CTabs activeItemKey="income">
            <CTabList variant="tabs" >
            <CTab itemKey="income">Income & Expenditure</CTab>
              <CTab itemKey="reciept">Reciepts & Payment </CTab>
             
            
              <CTab itemKey="trail">Trail Balance</CTab>
              <CTab itemKey="balance">Balance Sheet</CTab>
              <CTab itemKey="cash">Cash Book</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="p-3" itemKey="income" >
                <IncomeExpenditure/>
               
              </CTabPanel>

              <CTabPanel className="p-3" itemKey="reciept">

           <RecieptPayment/>
               
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="trail">

<TrialBalance/>
    
   </CTabPanel>
   <CTabPanel className="p-3" itemKey="balance">

<BalanceSheet/>
    
   </CTabPanel>
   <CTabPanel className="p-3" itemKey="cash">

<CashBook/>
    
   </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCard>
      </CCol>
    </div>
  )
}

export default Report
