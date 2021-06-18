import React, { Component } from "react";
import SidebarItem from "./SidebarItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMoneyBillWave,
  faGraduationCap,
  faPowerOff,
  faSearch,
  faAlignLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// SASS
import "../../styles/_new-sidebar.scss"

export default class NewSidebar extends Component {
    componentDidUpdate = () => {
        console.log(this.props)
    }

  render() {
    return (
      <div className={this.props.collapsed ? "sidebar collapsed" : "sidebar"}>
        <div className="sidebar-header">
          <img
            src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623859634/Il%20Diaro%20Del%20Matched%20Bettista/logTavola_disegno_9_copia_4_qsfzqv.png"
            alt="Il Diaro Del Matched Bettista Logo"
          />
        </div>
        <div id="user-profile-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              alt="user profile image"
            />
            <p>Benvenuto USERNAME</p>
          </div>
        <div className="sidebar-content">
          <button>
            <FontAwesomeIcon icon={faHome} />
            Home
          </button>
          <button>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            Bonus
          </button>
          <button>
            <FontAwesomeIcon icon={faGraduationCap} />
            Accademy
          </button>
          <SidebarItem
            title={"Odds Searcher"}
            numberOfItems={["Oddsmatcher", "Dutcher", "Trimatcher"]}
            icon={faSearch}
          />
          <SidebarItem
            title={"Offline Tolls"}
            numberOfItems={[
              "Punta - Banca",
              "Punta - Punta",
              "Trimatcher",
              "Multipla",
              "Condizionato",
              "Combo",
              "Convertitore P-B",
              "Casino",
              "CashBack 2 Vie",
              "CashBack 3 Vie",
            ]}
            icon={faPowerOff}
          />
          <SidebarItem
            title={"Account"}
            numberOfItems={["Profilo", "Log Out"]}
            icon={faUser}
          />
          <button>
            <FontAwesomeIcon icon={faAlignLeft} />
            Forum
          </button>
        </div>
      </div>
    );
  }
}
