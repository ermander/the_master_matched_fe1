// React Router Dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss"
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Homepage
import Homepage from "./components/Homepage/Homepage"
// User authentication and registration
import Login from "./components/Login/Login"
import Registration from "./components/Registration/Registration"
import RestorePassword from "./components/Restore Password/RestorePassword";
// Offline tools
import OfflineDutcher from "./components/OfflineTools/Dutcher/OfflineDutcher"
import OfflineTrimatcher from "./components/OfflineTools/Trimatcher/OfflineTrimatcher"

// Online Tools
import Dutcher from "./pages/Dutcher"
import Trimatcher from "./pages/Trimatcher"

import ComingSoon from "./components/Coming Soon Page/ComingSoon"

// Profit Tracker
import ProfitTracker from "./pages/ProfitTracker"
import Casino from "./components/ProfitTracker/Casino"

import NewSidebar from "./components/NewSidebar/NewSidebar";
import NewDutcher from "./components/NewDutcher/NewDutcher";


function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* Homepage */}
          <Route path="/" exact>
            <Login />
          </Route>
          {/*Login and registration*/}
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/registration" exact>
            <Registration />
          </Route>
          <Route path="/restore-password" exact>
            <RestorePassword />
          </Route>
          <Route path="/prova">
            <NewSidebar />
          </Route>

          {/*Tools offline */}
          <Route path="/cashback-2-vie" exact>
            <OfflineDutcher />
          </Route>
          <Route path="/cashback-3-vie" exact>
            <OfflineTrimatcher />
          </Route>
          <Route path="/coming-soon">
            <ComingSoon />
          </Route>
          {/* Tools Online */}
          <Route path="/dutcher" exact>
            <NewDutcher />
          </Route>
          <Route path="/trimatcher" exact>
            <Trimatcher />
          </Route>
          {/* Profit Tracker */}
          <Route path="/profit-tracker/partite-in-corso" exact>
            <ProfitTracker />
          </Route>
          <Route path="/profit-tracker/casino" exact>
            <Casino />
          </Route>
        </Switch>
      </Router>

    </>
  )
}

export default App;

