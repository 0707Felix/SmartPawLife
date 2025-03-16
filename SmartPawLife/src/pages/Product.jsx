import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const Product = () => {
  const location = useLocation();
  // 主畫面關鍵字搜尋 "searchTerm" 設為狀態
  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm || ""
  );
  //API取得所有商品狀態
  const [allProducts, setAllProducts] = useState([]);
  //API取得所有商品狀態去進行後續篩選作業
  const [filteredProducts, setFilteredProducts] = useState([]);
  //商品種類篩選狀態
  const [filterCategory, setFilterCategory] = useState("全部");
  //頁數狀態
  const [currentPage, setCurrentPage] = useState(1);
  //每頁商品上限數
  const productsPerPage = 6;
  //頁面刷新時狀態
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  //點擊收藏狀態
  const [heart, setHeart] = useState(() => {
    const initheart = localStorage.getItem("wishItem")
      ? JSON.parse(localStorage.getItem("wishItem"))
      : {};
    return initheart;
  });

  const getAllProduct = async () => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/products/all`
      );
      setAllProducts(res.data.products);
      setFilteredProducts(res.data.products);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  // 當 filterCategory 或 searchTerm 變化時，重新計算 filteredProducts
  useEffect(() => {
    const newFilteredProducts = allProducts.filter((product) => {
      const matchesCategory =
        filterCategory === "全部" || product.category === filterCategory;

      const matchesSearchTerm =
        !searchTerm ||
        product.title.includes(searchTerm) ||
        product.description.includes(searchTerm);

      return matchesCategory && matchesSearchTerm;
    });

    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1); // 重置分頁到第一頁
  }, [filterCategory, searchTerm, allProducts]);

  const addlist = ["全部", "新品上市"];
  const sortSet = new Set(allProducts.map((product) => product.category));
  sortSet.delete("新品上市");

  const categories = [...addlist, ...sortSet];

 
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleheartItem = (product_id) => {
    const finalheartstate = {
      ...heart,
      [product_id]: !heart[product_id],
    };
    localStorage.setItem("wishItem", JSON.stringify(finalheartstate));
    setHeart(finalheartstate);
  };

  return (
    <>
      <div className="hero d-flex align-items-center justify-content-center">
        <div className="text-gray0 p-3 explore">
          <h2 className="fw-bold">索專屬你的毛孩世界</h2>
          <h4 className="fw-bold">
            精選多品類寵物智能產品，打造全方位的幸福生活
          </h4>
        </div>
      </div>
      <div className="container my-4">
        <div className="row justify-content-between">
          <aside className="col-lg-2">
            <div
              className="sidebar d-flex flex-lg-column flex-row overflow-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <h6 className="mb-1 d-none d-lg-block">產品分類</h6>
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFilterCategory(item);
                    setCurrentPage(1);
                    setSearchTerm(""); // 清除關鍵字
                  }}
                  type="button"
                  className="btn btn-outline-none p-12 text-nowrap text-primary"
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>

          <div className="col-lg-9">
            {displayedProducts.length > 0 ? (
              <div className="row mt-4">
                <h3 className="text-primary mb-2">智能戶外，探索無限</h3>
                <p className="h6 mb-5">
                無論是遛狗、露營，還是戶外探險，我們的戶外智能產品讓您的寵物安全又快樂。高科技設計結合耐用材質，為毛孩打造最棒的戶外體驗。
                </p>
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="col-md-4 col-12 mb-3 d-flex flex-wrap"
                  >
                    <div className="card product-card flex-fill position-relative">
                      <div className="position-absolute top-0 end-0">
                        <button
                          type="button"
                          className="btn border-0"
                          onClick={() => {
                            toggleheartItem(product.id);
                          }}
                        >
                          <i
                            className={`${
                              heart[product.id] ? "fas" : "far"
                            } fa-heart p-2 border border-1 rounded-circle bg-white`}
                          ></i>
                        </button>
                      </div>

                      <img
                        src={product.imageUrl}
                        className="card-img-top h-100"
                        alt={product.title}
                      />

                      <div className="card-body">
                        <Link to={`/information/${product.id}`}>
                          <h6 className="text-secondary-dk mb-1">
                            {product.title}
                          </h6>
                          <span className="text-gray3">{product.category}</span>
                          <p className="text-primary mt-12">${product.price}</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-60 mb-120 h3">
                沒有找到符合「{searchTerm}」的產品。
              </p>
            )}

            <div className="pagination-container mt-sm-64 mb-sm-120">
              <nav>
                <ul className="pagination d-flex justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link me-sm-30"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      上一頁
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item  rounded-circle ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link ms-sm-30"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link  ms-sm-60"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      下一頁
                    </button>
                  </li>
                </ul>
              </nav>
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
    </>
  );
};

export default Product;
