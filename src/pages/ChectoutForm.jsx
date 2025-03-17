import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const CheckoutForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log("表單資料:", data); 
    sendOrder(data);
  });

  const sendOrder = async (data) => {
    try {
      const { name, email, phone, address, message } = data;
      const requestData = {
        data: {
          user: {
            name,
            email,
            tel: phone, 
            address,
          },
          message,
        },
      };

      console.log("送出訂單:", requestData);

      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/order`,
        requestData
      );

      if (res.status === 200) {
        const orderId = res.data.orderId; 
        navigate(`/checkoutway?orderId=${orderId}`);
      }
    } catch (error) {
      console.error("錯誤回應:", error.response?.data || error);
      alert("訂單不成立，請檢查輸入內容");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <nav className="navbar navbar-expand-lg navbar-light px-0">
            <Link className="navbar-brand" to="/cart">
              {"<"}返回購物車
            </Link>
            <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-center justify-content-md-end w-100 mt-md-0 mt-4">
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                <span className="text-nowrap">填寫訂單</span>
              </li>
              <li className="me-md-6 me-3 position-relative custom-step-line">
                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
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
          <h4 className="fw-bold mb-4 pt-3 text-center">填寫訂單</h4>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5">

        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="ContactName" className="text-muted mb-0">
                收件人姓名
              </label>
              <input
                {...register("name", { required: "收件人姓名欄位必填" })}
                type="text"
                className={`form-control ${errors.name && "is-invalid"}`}
                id="Contactname"
                placeholder=""
              />
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ContactName" className="text-muted mb-0">
                收件人地址
              </label>
              <input
                {...register("address", { required: "收件人地址欄位必填" })}
                type="text"
                className={`form-control ${errors.address && "is-invalid"}`}
                id="Contactaddress"
                placeholder=""
              />
              {errors.address && (
                <span className="text-danger">{errors.address.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ContactPhone" className="text-muted mb-0">
                聯絡電話
              </label>
              <input
                {...register("phone", {
                  required: "聯絡電話欄位必填",
                  pattern: {
                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                    message: "電話格式錯誤",
                  },
                })}
                type="text"
                className={`form-control ${errors.phone && "is-invalid"}`}
                id="ContactPhone"
                placeholder="Password"
              />
              {errors.phone && (
                <span className="text-danger">{errors.phone.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ContactMail" className={"text-muted mb-0"}>
                信箱帳號:
              </label>
              <input
                {...register("email", {
                  required: "Email 欄位必填",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email格式錯誤",
                  },
                })}
                type="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                id="ContactMail"
                aria-describedby="emailHelp"
                placeholder="example@gmail.com"
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ContactMessage" className="text-muted mb-0">
                備註事項:
              </label>
              <textarea
                {...register("message")}
                className="form-control"
                rows="3"
                id="ContactMessage"
                placeholder="message ... "
              ></textarea>
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center  w-100">
              <Link to="/product" className="text-dark mt-md-0 mt-3">
                <i className="fas fa-chevron-left me-2"></i> 繼續選購
              </Link>

              <button type="submit" className="btn btn-gray4 py-3">
                繼續結帳
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
