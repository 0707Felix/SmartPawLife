import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../assets/Layout/_swiper.scss";


const bannerImages = [
  {
    id: 1,
    image: "./img/swiper/banner1.png", // 桌機/平板版
    mobileImage: "./img/swiper/smallbanner1.png", // 手機版
  },
  {
    id: 2,
    image: "./img/swiper/banner2.png",
    mobileImage: "./img/swiper/smallbanner2.png",
  },
  {
    id: 3,
    image: "./img/swiper/banner3.png",
    mobileImage: "./img/swiper/smallbanner3.png",
  },
];


const Swiperbanner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // 防止表單默認提交行為
    navigate("/product", { state: { searchTerm } }); // 傳遞 searchTerm // 跳轉到產品頁面並傳遞關鍵字
  };



  return (
    <>
      <div className="position-relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
          }}
        >
          {bannerImages.map((item) => (
            <SwiperSlide key={item.id}>
              <picture>
                {/* 小螢幕（max-width: 576px）顯示手機版圖片 */}
                <source media="(max-width: 576px)" srcSet={item.mobileImage} />
                {/* 預設顯示桌機/平板版圖片 */}
                <img
                  className="pagination w-100 d-block object-fit-cover"
                  src={item.image}
                  alt={`第${item.id}圖`}
                  style={{ height: "840px" }}
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="topicsearch">
          <div className="container">
            <div className="text-white fw-bolder">
              <h1 className="mb-2">讓科技寵愛你的寵物生活</h1>
              <h4 className="mb-4">
                專為毛小孩打造的智能用品，讓每一天更輕鬆、更快樂
              </h4>
            </div>
            <form onSubmit={handleSearch} className="d-flex mb-4" role="search">
              <input
                className="form-control p-3"
                type="search"
                placeholder="季節主打商品熱賣中"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <img src="./img/swiper/Arrow.svg" alt="Arrow" />
              </button>
            </form>
            <div>
              <Link to="/product">
                <button
                  className="btn btn-primary py-2 px-4 mt-2 text-white rounded-pill"
                  type="button"
                >
                  立即選購
                  <img src="./img/swiper/Arrow.svg" alt="Arrow" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Swiperbanner;
