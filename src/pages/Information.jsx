import { useEffect, useState, useRef,useCallback } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useDispatch } from "react-redux";
import { updateCartData } from "../redux/cartSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const Information = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [qtySelect, setQtySelect] = useState(1);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id: product_id } = useParams();
  const swiperRefup = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch(updateCartData(res.data.data));
    } catch (error) {
      console.error("取得購物車失敗:", error);
    }
  }, [dispatch]); 

  useEffect(() => {
    const getProduct = async () => {
      setIsScreenLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/product/${product_id}`
        );
        setProducts([res.data.product]);
        await getCart();
      } catch (error) {
        toast.error("❌ 取得產品失敗！");
        console.error("取得產品錯誤:", error);
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProduct();
    getAllProduct();
  }, [product_id, getCart]);

  useEffect(() => {
    new Swiper(swiperRefup.current, {
      modules: [Autoplay],
      loop: false,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      slidesPerView: 4, // 預設桌機顯示 4 張
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
  //取得所有商品
  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setAllProducts(res.data.products);
    } catch (error) {
      console.error("取得商品失敗", error.response?.data || error.message);
    }
  };


  // 加入購物車
  const addCartItem = async (
    product_id,
    qty,
    productName,
    isDirectBuy = false
  ) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: { product_id, qty: Number(qty) }, // 確保 qty 是數字
      });

      // 只有在「非直接購買」時才顯示 toast
      if (!isDirectBuy) {
        toast.success(`🛒 已將「${productName}」加入購物車！`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      setQtySelect(1); // **重置數量輸入框**
      await getCart(); // **更新購物車數據**

      // 如果是直接購買，則跳轉到購物車頁面
      if (isDirectBuy) {
        navigate("/cart");
      }
    } catch (error) {
      // 只有在「非直接購買」時才顯示錯誤 toast
      if (!isDirectBuy) {
        toast.error("❌ 加入購物車失敗！");
      }
      console.error("加入購物車錯誤:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 確保 ToastContainer 存在，通知才能顯示 */}
      <ToastContainer />

      <div className="container mt-4">
        <nav aria-label="breadcrumb">
          {products.map((item) => (
            <ol className="breadcrumb" key={item.id}>
              <Link to="/home" className="breadcrumb-item">
                首頁
              </Link>
              <Link
                to="/product"
                className="breadcrumb-item active"
                aria-current="page"
              >
                {item.category}
              </Link>
              <Link
                to="#"
                className="breadcrumb-item active"
                aria-current="page"
              >
                {item.title}
              </Link>
            </ol>
          ))}
        </nav>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-6">
              <img
                src={product.imageUrl}
                className="img-fluid object-fit-cover"
                alt="產品圖片"
              />
              <div className="d-flex mt-2 col-4">
                {product.imagesUrl.map(image => (
                  <img
                    key={image}
                    src={image}
                    className="img-fluid object-fit me-1"
                    // width=""
                    alt="產品圖片"
                  />
                ))}
              </div>
            </div>
          ))}

          {products.map((product) => (
            <div key={product.id} className="col-md-6">
              <h5>{product.title}</h5>
              <h4 className="text-primary h2 mt-3 mb-3">${product.price}元</h4>
              <div className="d-flex align-items-center gap-2">
              <p className="text-Secondary-dk h6">顏色</p>               
                <div
                  className="border border-1 bg-white d-flex justify-content-center align-items-center rounded-circle"
                  style={{ width: "60px", height: "60px" }}
                >
                  請備註
                </div>
                </div>

              <div className="d-flex align-items-center mt-36 mb-36 gap-1">
                <p className="text-Secondary-dk h6 me-2">規格</p>
                <button
                  onClick={() => setQtySelect((num) => num + 2)}
                  className="btn btn-secondary-dk text-white w-25 rounded-pill"
                >
                  好事成雙2入
                </button>
                <button
                  onClick={() => setQtySelect((num) => num + 6)}
                  className="btn btn-primary text-white w-25 rounded-pill "
                >
                  六六大順6入
                </button>
                <button
                  onClick={() => setQtySelect((num) => num + 10)}
                  className="btn btn-danger text-white w-25 rounded-pill"
                >
                  十全十美10入
                </button>
              </div>
              <div className="d-flex align-items-center">
                <label htmlFor="quantity" className="">
                  數量：
                </label>
                <button
                  onClick={() => setQtySelect((prev) => Math.max(1, prev - 1))}
                  type="button"
                  className="btn btn-gray2 btn-sm text-white p-2"
                >
                  –
                </button>
                <input
                  type="text"
                  id="quantity"
                  className="form-control w-25 text-center"
                  value={qtySelect}
                  min="1"
                  readOnly
                  onChange={(e) => setQtySelect(Number(e.target.value))}
                />
                <button
                  onClick={() => setQtySelect((prev) => prev + 1)}
                  type="button"
                  className="btn btn-outline-primary btn-sm p-2"
                >
                  +
                </button>
              </div>
              <hr />
              <div className="d-flex">
                <button
                  onClick={() => addCartItem(product.id, qtySelect, null, true)}
                  className="btn btn-primary text-white mt-3 w-50 rounded-pill"
                >
                  直接購買
                </button>
                <button
                  onClick={() => {
                    addCartItem(product.id, qtySelect, product.title);
                  }}
                  className="btn btn-outlineprimary border border-primary ms-4 mt-3 w-50 rounded-pill"
                >
                  {isLoading ? (
                    <ReactLoading
                      type="spin"
                      color="#000"
                      height="1.5rem"
                      width="1.5rem"
                    />
                  ) : (
                    "加入購物車"
                  )}
                </button>
              </div>
            </div>
          ))}

          <div className="container mt-60 mb-120">
            <div className="col-sm-4">
              {products.map((product) => (
                <div key={product.id}>
                  <nav>
                    <div className="nav " id="nav-tab" role="tablist">
                      <button
                        className="nav-link rounded-4 p-3 border border-1 bg-gray1 text-gray4 ms-1"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        產品描述
                      </button>
                      <button
                        className="nav-link rounded-4 p-3 border border-1 bg-gray1 text-gray4 ms-3"
                        id="nav-contact-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-contact"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        說明內容
                      </button>
                    </div>
                  </nav>
                  <div
                    className="tab-content py-36 ps-4 pe-4 mt-4"
                    id="nav-tabContent"
                  >

                    <div
                      className="tab-pane fade  lh-lg"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      {product.description}
                    </div>
                    <div
                      className="tab-pane fade  lh-lg"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      {product.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <div>
              <h2 className="text-center mb-60 fw-bold">限時優惠</h2>
              <div ref={swiperRefup} className="swiper">
                <div className="swiper-wrapper">
                  {allProducts.map(product => (
                    <div key={product.id}
                      className="swiper-slide d-flex"
                    >
                      <div className="card border-0">
                        <Link to={`/information/${product.id}`}>
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="img-fluid object-fit-cover"
                          />
                          <div className="card-body p-2">
                            <h4 className="mb-2 mt-2 text-secondary-dk">{product.title}</h4>
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
            <ReactLoading
              type="spin"
              color="black"
              width="4rem"
              height="4rem"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Information;
