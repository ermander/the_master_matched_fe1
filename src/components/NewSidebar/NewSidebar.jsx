import React, { Component } from 'react'
import SidebarItem from "./SidebarItem"


export default class NewSidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <img src="https://res.cloudinary.com/dnadfuxk0/image/upload/v1623859634/Il%20Diaro%20Del%20Matched%20Bettista/logTavola_disegno_9_copia_4_qsfzqv.png" alt="Il Diaro Del Matched Bettista Logo" />
                </div>
                <div className="sidebar-content">
                    <h5>Home</h5>
                    <h5>Accademy</h5>
                    <h5>Bonus</h5>
                    <SidebarItem />
                    <h5>Profit Tracker</h5>
                    <SidebarItem />
                    <h5>Odds Finders</h5>
                    <h5>Offline Tools</h5>
                    <h5>Account</h5>
                    <h5>Forum</h5>
                </div>
            </div>
        )
    }
}
