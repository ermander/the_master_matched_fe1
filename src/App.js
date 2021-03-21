// React Router Dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Components
//Homepage
import Homepage from "./components/Homepage/Homepage"
// User authentication and registration
import Login from "./components/Login/Login"
import Registration from "./components/Registration/Registration"
// Offline tools
import Dutcher from "./components/OfflineTools/Dutcher/Dutcher"
import Trimatcher from "./components/OfflineTools/Trimatcher/Trimatcher"


import ComingSoon from "./components/Coming Soon Page/ComingSoon"


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
            <Dutcher />
          </Route>
          <Route path="/cashback-3-vie" exact>
            <Trimatcher />
          </Route>
          <Route path="/coming-soon">
            <ComingSoon />
          </Route>
        </Switch>
      </Router>

    </>
  )
}

export default App;

