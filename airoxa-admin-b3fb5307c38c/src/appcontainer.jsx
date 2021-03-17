import React from "react";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/header/index';
import SidebarNav from './components/sidebar/index';
import Nurses from './components/nurses/index';
import AddNurse from './components/nurses/addNurse';
//import Footer from './components/footer';
//import Home from './components/home';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Login from './components/auth/login';

const AppContainer = function (props) {
  if (props) {
    //const url = props.location.pathname.split("/")[1];

    return (
      <Router>
            <div>
            {/* <Route path="/sider-menu" exact component={SideMenu} /> */}
            <PrivateRoute component={Header} />
            <PrivateRoute component={SidebarNav} />
            <Switch>
              <PublicRoute restricted={true} component={Login} path="/login" exact />
              {/* <Route path="(/|/home)" exact component={Home} /> */}
              <PrivateRoute path="/nurses" exact component={Nurses} />
              <PrivateRoute path="/nurses/add" exact component={AddNurse} />
            </Switch>
            {/* <Route render={(props) => <Footer {...props}/>}/> */}
            </div>
      </Router>
    )
  }
  return null;
}

export default AppContainer;
