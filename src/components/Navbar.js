import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/podcast.png";
const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light bg-gradient py-1 shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="logo" />
          <span className="ms-2">Podcast Store</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
