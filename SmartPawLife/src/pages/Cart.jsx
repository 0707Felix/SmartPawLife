import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItemFromState } from "../redux/cartSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const Cart = () => {
  const [cart, setCart] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProduct();
    getCart();
    new Swiper(swiperRef.current, {
      modules: [Autoplay],
      loop: false,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 3,
      spaceBetween: 10,
      breakpoints: {
        1024: {
          // 桌機
          slidesPerView: 5,
          spaceBetween: 24,
        },
        768: {
          // 平板
          slidesPerView: 3,
          spaceBetween: 20,
        },
        576: {
          // 大手機、小平板
          slidesPerView: 2,
          spaceBetween: 15,
        },
        375: {
          // 小螢幕手機
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
    });
  }, []);

  //取得購物車商品
  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCart(res.data.data);
    } catch (error) {
      alert("取得購物車列表失敗");
    }
  };

  //取得所有商品
  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setAllProducts(res.data.products);
    } catch (error) {
      alert("取得商品失敗");
    }
  };

  //清空單一商品
  const removeCartItem = async (cartItem_id) => {
    setIsScreenLoading(true);

    // 先從 Redux 狀態中移除，讓 UI 立即更新
    dispatch(removeCartItemFromState(cartItem_id));

    try {
      // 發送 API 刪除請求
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`);

      // 再重新取得最新的購物車資料，確保同步
      await getCart();
    } catch (error) {
      alert("刪除購物車商品失敗");
      // 如果 API 失敗，將商品重新加回 Redux（Rollback 機制）
      getCart();
    } finally {
      setIsScreenLoading(false);
    }
  };
  //更新購物車數量
  const updateCartItem = async (cartItem_id, product_id, qty) => {
    setIsScreenLoading(true);
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cartItem_id}`, {
        data: {
          product_id,
          qty: Number(qty),
        },
      });
      getCart();
    } catch (error) {
      alert("刪除購物車失敗");
    } finally {
      setIsScreenLoading(false);
    }
  };
  const [disCountCode,setDisCountCode] = useState("");

  const discountInput = (e)=>{
      setDisCountCode(e.target.value)
  }

   const useDiscountCode = async(code)=>{
    try{
    const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/coupon`,
        {
          data:{
          code,
        }
      }
    );
    console.log(res.data);
    getCart(); // 每次折扣碼變化時更新購物車
    }catch(error){
      console.error("提交折扣失敗",error.response?.data || error);
    }
   }

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="mt-3">
          <h3 className="mt-3 mb-4">購物車清單</h3>
          <div className="row">
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col" className="border-0 ps-0">
                      商品名稱
                    </th>
                    <th scope="col" className="border-0">
                      數量
                    </th>
                    <th scope="col" className="border-0">
                      價格
                    </th>
                    <th scope="col" className="border-0"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.carts?.map((cartItem, index) => (
                    <tr key={index} className="border-bottom border-top">
                      <th
                        scope="row"
                        className="border-0 px-0 font-weight-normal py-4"
                      >
                        <img
                          src={cartItem.product.imageUrl}
                          alt={cartItem.product.title}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                        />
                        <p className="mb-0 fw-bold d-inline-block">
                          {cartItem.product.title}
                        </p>
                      </th>
                      <td
                        className="border-0 align-middle"
                        style={{ maxWidth: "160px" }}
                      >
                        <div className="input-group ps-3">
                          <div className="input-group-prepend">
                            <button
                              onClick={() => {
                                updateCartItem(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty - 1
                                );
                              }}
                              disabled={cartItem.qty === 1}
                              className="btn btn-primary border-0 py-1 btn-sm mt-sm-3"
                              type="button"
                              id="button-addon1"
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control border-0 text-sm-center shadow-none fs-6 p-3 m-2"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            value={cartItem.qty}
                            readOnly
                          />
                          <div className="input-group-append">
                            <button
                              onClick={() => {
                                updateCartItem(
                                  cartItem.id,
                                  cartItem.product.id,
                                  cartItem.qty + 1
                                );
                              }}
                              className="btn btn-primary border-0 py-1 btn-sm mt-sm-3"
                              type="button"
                              id="button-addon2"
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="border-0 align-middle text-center">
                        <p className="mb-0 ms-auto">
                          NT${cartItem.product.price}
                        </p>
                      </td>
                      <td className="border-0 align-middle">
                        <button
                          onClick={() => {
                            removeCartItem(cartItem.id);
                          }}
                          className="btn btn-gray4 border-0 py-2 mb-3"
                          type="button"
                          id="button-addon2"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="input-group w-50 mb-3">
                <input
                  type="text"
                  className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                  placeholder="SmartPaw折扣"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={disCountCode}
                  onChange={discountInput}
                />
                
                <div className="input-group-append">
                  <button
                    onClick={()=>{useDiscountCode(disCountCode)}}
                    className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="fw-bold mb-4">訂單資訊</h4>
                <table className="table text-muted border-bottom">
                  <tbody>
                    <tr>
                      <td>小計</td>
                      <td className="text-end">NT${cart.total}</td>
                    </tr>
                    <tr>
                      <td>省下金額</td>
                      <td className="text-end">NT${cart.total-cart.final_total}元</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">總計</p>
                  <p className="mb-0 h4 fw-bold">NT${cart.final_total}</p>
                </div>
                {cart.total ? (
                  <Link
                    to="/checkoutform"
                    className="btn btn-primary w-100 mt-4"
                  >
                    結帳付款
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="my-5">
            <h3 className="fw-bold">更多相關商品...</h3>
            <div ref={swiperRef} className="swiper mt-4 mb-5">
              <div className="swiper-wrapper">
                {allProducts.map((product) => (
                  <div key={product.id} className="swiper-slide">
                    <div className="card border-0 mb-4 position-relative">
                      <Link to={`/information/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          className="card-img-top rounded-0"
                          alt={product.title}
                        />
                        <div className="card-body p-0">
                          <h4 className="text-secondary-dk mb-2 mt-2">{product.title}</h4>
                          <span className="text-primary h4">
                            NT${product.price}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
    </div>
  );
};
export default Cart;
