// React Router Dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

//Homepage
//import Homepage from "./components/Homepage/Homepage"

// User authentication and registration
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import RestorePassword from "./components/Restore Password/RestorePassword";

// Online Tools
// OddsMatcher Page
import OddsMatcher from "./pages/OddsMatcher";
// Dutcher Page
import Dutcher from "./pages/Dutcher";
// Trimatcher Page
import Trimatcher from "./pages/Trimatcher";
// Targheter Page
import Targheter from "./pages/Targheter";

// Offline tools
// Punta e Banca
import PuntaBanca from "./pages/PuntaBanca";
import PuntaPunta from "./pages/PuntaPunta";

// Online Tools

import ComingSoon from "./components/Coming Soon Page/ComingSoon";

// Profit Tracker
import ProfitTracker from "./pages/ProfitTracker";
import Casino from "./components/ProfitTracker/Casino";

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

          {/* Tools Online */}
          <Route path="/oddsmatcher" exact>
            <OddsMatcher />
          </Route>
          <Route path="/dutcher" exact>
            <Dutcher />
          </Route>
          <Route path="/trimatcher" exact>
            <Trimatcher />
          </Route>
          <Route path="/targheter" exact>
            <Targheter />
          </Route>

          {/* Tools Offline */}
          <Route path="/punta banca" exact>
            <PuntaBanca />
          </Route>
          <Route path="/punta punta" exact>
            <PuntaPunta />
          </Route>

          {/* Profit Tracker */}
          <Route path="/profit-tracker/partite-in-corso" exact>
            <ProfitTracker />
          </Route>
          <Route path="/profit-tracker/casino" exact>
            <Casino />
          </Route>

          <Route path="/coming-soon">
            <ComingSoon />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
