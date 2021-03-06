import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Signin from "./containers/signin";
import CreateProfile from "./containers/createProfile";
import EditProfile from "./containers/editProfile/editProfile";
import AssignTask from "./containers/assignTask/assignTask";
import AssignShift from "./containers/assignShift/assignShift";
import ApproveDrops from "./containers/approveDrops";
import matchUsers from "./containers/developer/matchUsers";
import SwapShift from "./containers/developer/swapShift";

import Task from "./containers/developer/task";
import Shift from "./containers/developer/shifts";

import GetAllUsers from "./containers/gellAllUsers";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      login: JSON.parse(localStorage.getItem("user")) ? true : false
      // role: JSON.parse(localStorage.getItem("user")).role
    };
  }

  render() {
    const { login, user } = this.state;
    const { role } = user ? user : "";
    return (
      <Router>
        <Switch>
          <PrivateRoute
            path="/createprofile"
            login={login}
            role={role}
            component={CreateProfile}
          />
          <PrivateRoute
            path="/assignshift"
            login={login}
            role={role}
            component={AssignShift}
          />
          <PrivateRoute
            path="/assigntask"
            login={login}
            role={role}
            component={AssignTask}
          />
          <PrivateRoute
            path="/editprofile"
            login={login}
            role={role}
            component={EditProfile}
          />
          <PrivateRoute
            path="/allusers"
            login={login}
            role={role}
            component={GetAllUsers}
          />
          <PrivateRoute
            path="/task"
            login={login}
            role={role}
            component={Task}
          />
          <PrivateRoute
            path="/timings"
            login={login}
            role={role}
            component={Shift}
          />
          <PrivateRoute
            path="/approvedrops"
            login={login}
            role={role}
            component={ApproveDrops}
          />
          <PrivateRoute
            path="/matchusers"
            login={login}
            role={role}
            component={matchUsers}
          />
          <PrivateRoute
            path="/swapshift"
            login={login}
            role={role}
            component={SwapShift}
          />
          <Route exact path="/" component={Signin} />
        </Switch>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, role, login, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        login && role === ("manager" || "admin") ? (
          <Component exact {...props} />
        ) : login && role === "developer" ? (
          <Component exact {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default Routes;
