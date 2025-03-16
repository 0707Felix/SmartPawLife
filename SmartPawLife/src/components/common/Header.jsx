import React, { useState } from "react";
import {useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const routes = [
  {
    id: 1,
    title: "產品類別",
    src: "",
    link: "/product",
  },
  {
    id: 2,
    title: "寵物專欄",
    src: "",
    link: "article",
  },
  {
    id: 3,
    title: "關於SmartPaw Life",
    src: "",
    link: "/about",
  },
  {
    id: 4,
    title: "會員專屬",
    src: "",
    link: "/member",
  },
  {
    id: 5,
    title: "cart",
    src: "./img/header/cart.svg",
    link: "/cart",
  },
  {
    id: 6,
    title: "login",
    src: "./img/header/login.svg",
    link: "/login",
  },
];

const Header = () => {
  
  const carts = useSelector(state => state.cart.carts);
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <nav className="navbar navbar-expand-lg bg-gray0">
      <div className="container">
        {/* LOGO：大螢幕時顯示，小螢幕時隱藏 */}
        <h1 className="p-2">
        <NavLink className="navbar-brand d-lg-block" to="/home">
          <img src="./Header1_Logo.svg" alt="Logo" width="168" height="40" />
        </NavLink>
        </h1>
        {/* 漢堡選單按鈕：小螢幕時顯示 */}
        <button
          className="navbar-toggler ms-auto" // 將漢堡選單推到右邊
          type="button"
          onClick={toggleNavbar} 
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 導航連結 */}
        <div className={`collapse navbar-collapse text-center ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {routes.map((route) => (
              <li key={route.title} className="nav-item">
                <NavLink
                  className="nav-link px-4 py-4 my-1 mx-2 text-secondary-dk fw-medium"
                  to={route.link}
                  onClick={() => setIsOpen(false)} 
                >
                  {route.title === "cart" ? (
                    <div className="position-relative">
                      <i className="fas fa-shopping-cart text-danger"></i>
                      <span
                        className="position-absolute badge text-bg-success rounded-circle"
                        style={{
                          bottom: "12px",
                          right: "auto",
                          width: "22px",
                          height: "22px",
                          display: "inline-block",
                        }}
                      >
                      {carts?.length}
                      </span>
                    </div>
                  ) : (
                    <>
                      {route.src && (
                        <img
                          src={route.src}
                          alt={route.title}
                          width="20"
                          height="20"
                        />
                      )}
                      <span className={route.src ? "d-none" : "d-inline"}>
                        {route.title}
                      </span>
                      {route.src && (
                        <span className="d-inline d-md-none text-secondary-dk">
                          {route.title}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
