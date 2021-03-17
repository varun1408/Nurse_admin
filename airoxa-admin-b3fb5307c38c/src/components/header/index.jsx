import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logoicon from "../../assets/images/logo-small.png";
import avatar from "../../assets/images/avatar-01.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import IMG01 from "../../assets/images/doctor-thumb-01.jpg";
import IMG02 from "../../assets/images/doctor-thumb-02.jpg";
import IMG03 from "../../assets/images/doctor-thumb-03.jpg";


class Header extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount(){
      require('../../assets/css/app.css')
      require('../../assets/css/fontawesome.min.css')
  }

  handlesidebar=()=>{
    document.body.classList.toggle('mini-sidebar');
  }

  render() {
    const exclusionArray = [
      "/admin/login",
      "/admin/register",
      "/admin/forgotPassword",
      "/admin/lockscreen",
      "/admin/404",
      "/admin/500",
    ];
    if (exclusionArray.indexOf(this.props.location.pathname) >= 0) {
      return "";
    }
    return (
      <div>
        <div className="header">
          <div className="header-left">
            <Link to="/admin" className="logo">
              <img src={logo} alt="Logo" />
            </Link>
            <Link to="/admin" className="logo logo-small">
              <img src={logoicon} alt="Logo" width="30" height="30" />
            </Link>
          </div>

          <a href="#0" id="toggle_bttn" onClick={this.handlesidebar}>
					<i className="fe fe-text-align-left"></i>
				</a>
          {/* <div className="top-nav-search">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div> */}

          <a href="#0" className="mobile_btn" id="mobile_btn">
            <i className="fa fa-bars"></i>
          </a>

          <ul className="nav user-menu">
            <li className="nav-item dropdown has-arrow">
              <Dropdown className="user-dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <span className="user-img">
                    <img
                      className="rounded-circle"
                      src={avatar}
                      width="31"
                      alt="Ryan Taylor"
                    />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" className="no-padding">
                    <div className="user-header">
                      <div className="avatar avatar-sm">
                        <img
                          src={avatar}
                          alt="User"
                          className="avatar-img rounded-circle"
                        />
                      </div>
                      <div className="user-text">
                        <h6>Ryan Taylor</h6>
                        <p className="text-muted mb-0">Administrator</p>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="/admin/profile"> My Profile</Dropdown.Item>
                  <Dropdown.Item href="/admin/settings">Settings</Dropdown.Item>
                  <Dropdown.Item href="/admin">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
