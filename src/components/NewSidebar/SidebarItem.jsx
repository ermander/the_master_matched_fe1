import React, { useState } from "react";
import { 
    CButton, 
    CCollapse, 
    CCard, 
    CCardBody
} from "@coreui/react"

function SidebarItem() {
    const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Button</CButton>
      <CCollapse visible={visible}>
        <CCard className="mt-3">
          <CCardBody>
            Anim pariatur cliche reprehenderit, enim eiusmod high life
            accusamus terry richardson ad squid. Nihil anim keffiyeh
            helvetica, craft beer labore wes anderson cred nesciunt sapiente
            ea proident.
          </CCardBody>
        </CCard>
      </CCollapse>
    </>
  );
}

export default SidebarItem;
