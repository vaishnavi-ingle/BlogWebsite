// src/components/Home/Header.js

import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
// import SearchBar from "../SearchBar";

const Header = ({ active, setActive, user, handleLogOut }) => {
  const userId = user?.uid;
  console.log("userId", userId);
  console.log("name", user?.displayName);

  return (
    <div>
      <header className="header">
        <nav>
          <div className="nav-container2">
            <ul>
              <li className="list">
                <Link to="/">Home</Link>
              </li>
              <li className="list">
                <Link to="/trending">Trending</Link>
              </li>
              <li className="list">
                <Link to="/news">News</Link>
              </li>
              <li className="list">
                <Link to="/bollywood">Bollywood</Link>
              </li>
            </ul>
          </div>
          {/* <div className="nav-container">
            <SearchBar />
          </div> */}

          <div className="nav-container">
            <Link to="/Create">
              <ul>
                <li style={{ paddingRight: "15px" }} className="new-blog">
                  Create Blog
                </li>
              </ul>
            </Link>
          </div>

          <div className="nav-container">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userId ? (
                <>
                  {/* <div className="profile-logo">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt="logo"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginTop: "12px",
                        display: "inline-block",
                      }}
                    />
                  </div> */}
                  {/* <p style={{ display: "inline-block", marginLeft: "5px" }}>
                    {user?.displayName}
                  </p> */}
                  <li
                    className="nav-item nav-link"
                    onClick={handleLogOut}
                    style={{
                      cursor: "pointer",
                      marginTop: "1px",
                      fontSize: "1.1rem",
                      paddingLeft: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <Link to="/auth" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "login" ? "active" : ""
                    }`}
                    onClick={() => setActive("login")}
                  >
                    Login
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div className="centered-h2">
        <h2 className="home">
          <span style={{ color: "#fdfcdc" }}>Read.</span>
          <span style={{ color: "#6c584c" }}>Share.</span>
          <span>Create.</span>
        </h2>
      </div>
    </div>
  );
};

export default Header;
