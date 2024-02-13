import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const loginUser = props.userData;
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('Image-Uploader-Token');
    message.success("Logout Successful");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg nav">
        <div className="nav-item">
          <Link className="header-title" to="/">
            Expense Management
          </Link>
        </div>
        <div className="d-flex">
          <div className="nav-item">
            <div className="header-title">
              {loginUser && `Hello ${loginUser.name}`}
            </div>
          </div>
          <div className="nav-item">
            <button className="btn btn-secondary" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
