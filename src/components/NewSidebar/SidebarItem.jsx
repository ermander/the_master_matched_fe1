import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CButton, CCollapse, CCard, CCardBody } from "@coreui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SidebarItem({ title, numberOfItems, icon }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>        
        <FontAwesomeIcon icon={icon} />
        {title}
      </CButton>
      <CCollapse visible={visible}>
        <CCard className="mt-3">
          <CCardBody>
            {numberOfItems ? (
              numberOfItems.map((e, i) => {
                return (
                  <div className="link-container">
                    <Link key={i} to={"/" + e.toLowerCase()}>
                      {e}
                    </Link>
                  </div>
                );
              })
            ) : (
              <>
                <p>...</p>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCollapse>
    </>
  );
}

export default SidebarItem;
