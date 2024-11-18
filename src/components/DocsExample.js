import PropTypes from 'prop-types'
import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'

const DocsExample = (props) => {
  const { children, tabContentClassName } = props

  return (
    <div className="example">
      <CNav variant="underline-border">
        <CNavItem>
          <CNavLink href="#" active>
            Purchase
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            Sales
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            Receipt
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            Contra Voucher
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            Journal Voucher
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent className={`rounded-bottom ${tabContentClassName ? tabContentClassName : ''}`}>
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  tabContentClassName: PropTypes.string,
}

export default React.memo(DocsExample)
