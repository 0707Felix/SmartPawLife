import React from "react";
import axios from "axios";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartData } from "../redux/cartSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ChectoutWay = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/pay/${orderId}`);
        console.log(res.data);
        
      if (res.status === 200) {
        dispatch(clearCartData());
        navigate("/payok");
      }
    } catch (error) {
      console.error("錯誤回應:", error.response?.data || error);
      alert("結帳失敗，請稍後再試");
    }
  };



  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <nav className="navbar navbar-expand-lg navbar-light px-0">
            <Link className="navbar-brand" to="/checkoutform">
              {"<"}返回訂單
            </Link>
            <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">填寫訂單</span>
              </li>
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">付款方式</span>
              </li>
              <li>
                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">訂購完成</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-4 pt-3 text-center">選擇付款方式</h3>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5">
        {/* <div className="col-md-6">
          <div className="border p-4 mb-4">
            {cart.carts?.map((cartItem, index) => (
              <div key={index} className="d-flex mb-3">
                <img
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.title}
                  className="me-2"
                  style={{ width: "48px", height: "48px", objectFit: "cover" }}
                />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 fw-bold">{cartItem.product.title}</p>
                    <p className="mb-0">NT${cartItem.product.price}</p>
                  </div>
                  <p className="mb-0 fw-bold">x{cartItem.qty}</p>
                </div>
              </div>
            ))}
            <table className="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <td colSpan="2">
                    <label htmlFor="ContactName" className="text-muted my-2">
                      折價劵號碼
                    </label>
                    <input
                      className="mx-2"
                      type="text"
                      id="Contactname"
                      placeholder=""
                    />
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-1 font-weight-normal"
                  >
                    小計
                  </th>
                  <td className="text-end border-0 px-0 pt-1">
                    NT${cart.total}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總計</p>
              <p className="mb-0 h4 fw-bold">NT${cart.total}</p>
            </div>
          </div>
        </div> */}
        <div className="col-md-6">
          <div className="accordion" id="accordionExample">
            <div className="card rounded-0">
              <div
                className="card-header bg-white border-0 py-3"
                id="headingOne"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  貨到付款
                </p>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                ></div>
              </div>
            </div>
            <div className="card rounded-0">
              <div
                className="card-header bg-white border-0 py-3 collapsed"
                id="headingTwo"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  線上刷卡
                </p>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body bg-light ps-5 py-4">
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="text-muted mb-0">
                      信用卡號 :
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      placeholder=""
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cardType" className="text-muted mb-0">
                      卡別:
                    </label>
                    <select
                      name="cardType"
                      id="cardType"
                      className="form-control"
                      defaultValue="Mastercard"
                    >
                      <option value="VISA">VISA</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="JCB">JCB</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="expiryDate" className="text-muted mb-0">
                      有效月年:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiryDate"
                      placeholder="ex : 02/25"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cvv" className="text-muted mb-0">
                      背面末三碼:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      placeholder="ex :123"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card rounded-0">
              <div
                className="card-header bg-white border-0 py-3 collapsed"
                id="headingThree"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                <p className="mb-0 position-relative custom-checkout-label">
                  Apple | LinePay
                </p>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              ></div>
            </div>
          </div>
          <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center w-100">
            <Link to="/product" className="text-dark mt-md-0 mt-3">
              <i className="fas fa-chevron-left me-2"></i> 繼續選購
            </Link>

            <button
              onClick={handlePayment}
              className="btn btn-gray4 py-3"
            >
              確認付款
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChectoutWay;