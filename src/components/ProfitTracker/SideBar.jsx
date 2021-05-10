import React, { Component } from "react";
import "../../styles/_sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoll,
  faSyncAlt,
  faClipboardCheck,
  faDice,
  faPeopleArrows,
  faWallet,
  faFootballBall,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <div id="sidebar_container">
        <Link>
          <div className="profit_tracker_section">
            <FontAwesomeIcon icon={faSyncAlt} />
            <p>In Corso</p>
          </div>
        </Link>
        <Link>
          <div className="profit_tracker_section">
            <FontAwesomeIcon icon={faClipboardCheck} />
            <p>Terminate</p>
          </div>
        </Link>
        <Link to="/profit-tracker/casino">
          <div className="profit_tracker_section">
            <FontAwesomeIcon icon={faDice} />
            <p>Casino</p>
          </div>
        </Link>
        <Link>
          <div className="profit_tracker_section">
            <FontAwesomeIcon icon={faPeopleArrows} />
            <p>Utenti</p>
          </div>
        </Link>
        <Link>
          <div className="profit_tracker_section">
            <FontAwesomeIcon icon={faWallet} />
            <p>Sistemi di Pagamento</p>
          </div>
        </Link>
        <Link>
          <div className="profit_tracker_section">
            <FontAwesomeIcon icon={faFootballBall} />
            <p>Bookmakers</p>
          </div>
        </Link>
        <Link>
          <div className="profit_tracker_section">
            <FontAwesomeIcon icon={faPoll} />
            <p>Riepilogo</p>
          </div>
        </Link>
      </div>
    );
  }
}
