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
    <div style={{display: "flex", zIndex: "1000", backgroundColor: "#25272c"}}>
      <MDBNavbarBrand>
        {/*Inserire logo!*/}
      </MDBNavbarBrand>
      <button className="dropbtn ml-auto">
        <Link to="/coming-soon" style={{fontWeight: "400"}}>HOME</Link>
      </button>
      <button className="dropbtn">GUIDE</button>
      <div className="dropdown">
        <button className="dropbtn">BONUS</button>
        <div className="dropdown-content">
          <Link to="/coming-soon">
            BONUS DI BENVENUTO
          </Link>
          <Link to="/coming-soon">
            BONUS RICORRENTI
          </Link>
          <Link to="/coming-soon">
            THE MASTER MATCHED
          </Link>
          <Link to="/coming-soon">
            ELITE MATCHED
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">TOOLS</button>
        <div className="dropdown-content">
          <Link to="/coming-soon">
            ODDSMATCHER
          </Link>
          <Link to="/dutcher">
            DUTCHER
          </Link>
          <Link to="/coming-soon">
            TRIMATCHER
          </Link>
          <Link to="/coming-soon">
            TARGETER
          </Link>
        </div>
      </div>

      <div className="dropdown">
        <button className="dropbtn">CALCOLATORI</button>
        <div className="dropdown-content">
        <Link to="/coming-soon">
            PUNTA BANCA
          </Link>
          <Link to="/coming-soon">
            PUNTA PUNTA
          </Link>
          <Link to="/coming-soon">
            TRIMATCHER
          </Link>
          <Link to="/coming-soon">
            TOOL MULTIPLE 
          </Link>
          <Link to="/coming-soon">
            CONDIZIONATO
          </Link>
          <Link to="/coming-soon">
            COMBO - TOOL
          </Link>
          <Link to="/coming-soon">
            CONVERTER
          </Link>
          <Link to="/coming-soon">
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
          <Link to="/coming-soon">PROFIT TRACKER</Link>
          <Link>LOG OUT</Link>
        </div>
      </div>
      
      <button className="dropbtn mr-3">FORUM</button>
      </div>
    );
  }
}

export default NavbarPage;