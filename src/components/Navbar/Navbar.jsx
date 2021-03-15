import React, { Component } from "react";
import { MDBNavbarBrand } from "mdbreact";
import { Link } from 'react-router-dom';
import "./navbar.css"

class NavbarPage extends Component {
state = {
  collapseID: ""
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

render() {
  return (
    <div style={{display: "flex", zIndex: "1000", backgroundColor: "#202020"}}>
      <MDBNavbarBrand>
        {/*Inserire logo!*/}
      </MDBNavbarBrand>
      <button className="dropbtn ml-auto">
        <Link to="/oddsmatcher" style={{fontWeight: "400"}}>HOME</Link>
      </button>
      <button className="dropbtn">GUIDE</button>
      <div className="dropdown">
        <button className="dropbtn">BONUS</button>
        <div className="dropdown-content">
          <Link>
            BONUS DI BENVENUTO
          </Link>
          <Link>
            BONUS RICORRENTI
          </Link>
          <Link>
            THE MASTER MATCHED
          </Link>
          <Link>
            ELITE MATCHED
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">TOOLS</button>
        <div className="dropdown-content">
          <Link to="/">
            ODDSMATCHER
          </Link>
          <Link to="/">
            DUTCHER
          </Link>
          <Link to="/">
            TRIMATCHER
          </Link>
          <Link>
            TARGETER
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">CALCOLATORI</button>
        <div className="dropdown-content">
        <Link to="/punta-banca">
            PUNTA BANCA
          </Link>
          <Link to="/">
            PUNTA PUNTA
          </Link>
          <Link to="/">
            TRIMATCHER
          </Link>
          <Link to="/casino">
            TOOL MULTIPLE 
          </Link>
          <Link to="">
            CONDIZIONATO
          </Link>
          <Link to="">
            COMBO - TOOL
          </Link>
          <Link to="/converter">
            CONVERTER
          </Link>
          <Link>
            CASINO
          </Link>
          <Link to="cashback-2-vie">
            CASHBACK 2 VIE
          </Link>
          <Link to="cashback-3-vie">
            CASHBACK 3 VIE
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">ACCOUNT</button>
        <div className="dropdown-content">
          <Link>PROFILE</Link>
          <Link to="/profit_tracker/in-progress">PROFIT TRACKER</Link>
          <Link>LOG OUT</Link>
        </div>
      </div>
      
      <button className="dropbtn mr-3">FORUM</button>
      </div>
    );
  }
}

export default NavbarPage;