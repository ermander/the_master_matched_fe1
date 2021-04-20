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
// Offline tools
import OfflineDutcher from "./components/OfflineTools/Dutcher/OfflineDutcher"
import OfflineTrimatcher from "./components/OfflineTools/Trimatcher/OfflineTrimatcher"

// Online Tools
import Dutcher from "./pages/Dutcher"
import Trimatcher from "./pages/Trimatcher"


import ComingSoon from "./components/Coming Soon Page/ComingSoon"
// Profit Tracker
import ProfitTracker from "./pages/ProfitTracker"


function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* Homepage */}
          <Route path="/" exact>
            <Homepage />
          </Route>
          {/*Login and registration*/}
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/registration" exact>
            <Registration />
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
            <Dutcher />
          </Route>
          <Route path="/trimatcher" exact>
            <Trimatcher />
          </Route>
          {/* Profit Tracker */}
          <Route path="/profit-tracker/partite-in-corso" exact>
            <ProfitTracker />
          </Route>
        </Switch>
      </Router>

    </>
  )
}

export default App;

