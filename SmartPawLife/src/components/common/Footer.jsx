import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div
        className="position-absolute start-0 w-100 wave-bg"
        style={{
          backgroundImage: "url('./img/home/Wave 4.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: "translateY(-15%)",
          height: "60px",
          zIndex: "3",
        }}
      ></div>
      <div className="footer bg-primary-pt">
        <div className="container">
          <div className="d-md-flex justify-content-between text-center pt-5 pb-4">
            <img src="./Header1_Logo.svg" alt="Logo" width="168" height="40" />
            <ul className="d-md-flex align-items-center list-unstyled gap-3">
              <li className="my-12">
                <Link className="text-secondary-dk px-4" to="/product">
                  產品分類
                </Link>
              </li>
              <li className="my-12">
                <Link className="text-secondary-dk px-4" to="/about">
                  關於 SmartPaw Life
                </Link>
              </li>
              <li className="my-12">
                <Link className="text-secondary-dk px-4" to="/article">
                  寵物專欄
                </Link>
              </li>
            </ul>

            <ul className="d-flex justify-content-center gap-3 align-items-center list-unstyled m-0">
              <li>
              <a href="#"><img
                  src="./img/footer/facebook.png"
                  alt="Paw"
                  width="24"
                  height="24"
                  className="img-fluid"
                  /></a>
              </li>
              <li>
              <a href="#"><img
                  src="./img/footer/ig.png"
                  alt="Paw"
                  width="24"
                  height="24"
                  className="img-fluid"
                  /></a>
              </li>
              <li>
                <a href="#"><img
                  src="./img/footer/line.png"
                  alt="Paw"
                  width="24"
                  height="24"
                  className="img-fluid"
                /></a>
              </li>
            </ul>
          </div>
          <div className="text-center pt-2 pb-5 text-gray2">
            <p>
              SmartPaw Life股份有限公司：100 台北市中正區重慶南路一段 122 號
            </p>
            <p>
              版權所有：© Copyright 2024 S﻿martPaw Life. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
