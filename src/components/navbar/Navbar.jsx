import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Filter from "../filter/Filter";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const mode = 'light';

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  }

  return (
    <div className="nav-container w-full">
      <nav className="navbar flex justify-between items-center">
        <div className="logo">
          <a href="/">E-Commerce</a>
        </div>

        <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="hidden md:block flex-1 mx-4">
          <Filter />
        </div>

        <div className="hidden md:block">
          {user ? (
            <a onClick={logout} className="login-btn">
              Logout
            </a>
          ) : (
            <a href="/login" className="login-btn">
              Login
            </a>
          )}
        </div>

        <ul className={`nav-links ${isOpen ? "open" : ""} flex gap-4 font-sans`}>
          <li>
            <a href="/" className="box-link home">Home</a>
          </li>
          <li>
            <a href="/order" className="box-link order">Orders</a>
          </li>
          <li>
            <a href="/cart" className="box-link cart">Cart</a>
          </li>
          <li className="md:hidden">
            {user ? (
              <a onClick={logout} className="box-link login">
                Logout
              </a>
            ) : (
              <a href="/login" className="box-link login">
                Login
              </a>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;