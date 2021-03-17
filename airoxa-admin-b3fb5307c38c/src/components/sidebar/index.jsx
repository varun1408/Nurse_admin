import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

class SidebarNav extends Component {
    constructor(props){
      super(props);
      this.state={
        show: null
      }
    }

  handleShow(id){
    this.setState({
        show: id
    })
  }
  
  render() {
   
   const {  location } = this.props
   let pathname = location.pathname

   return (
    <div className="sidebar" id="sidebar">
      <div className="primary-nav">
        <nav role="navigation" className="menu">
          <Scrollbars
            style={{
              width: 250,
              height: "100%",
              backgroundColor: "rgb(121 145 165)",
            }}
            className="menu"
          >
            <Link to="/admin" className="logotype">
              LOGO<span>TYPE</span>
            </Link>
            <div className="overflow-container">
              <ul className="menu-dropdown">
                <li className="menu-title">Main</li>
                <li className={`${'/dashboard' === pathname ? 'active' : '' }`}>
                  <Link to="/dashboard"><i className="fe fe-home"></i>Dashboard</Link>
                </li>
                <li className={`${'/nurses' === pathname ? 'active' : '' }`}>
                  <Link to="/nurses"><i className="fe fe-layout"></i>Nurses</Link>
                </li>
                <li className={`${'/users' === pathname ? 'active' : '' }`}>
                   <Link to="/users"><i className="fe fe-users"></i>Users</Link>
                </li>
              </ul>
            </div>
          </Scrollbars>
        </nav>
      </div>
    </div>
  );
}
}

export default withRouter(SidebarNav);
