import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import Swiperbanner from "./Swiperbanner";
import feedback from "./feedback";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const swiperRefup = useRef(null);
  const swiperRefdown = useRef(null);
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
  //取得所有文章
  const getArticles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/articles`);
      setArticles(res.data.articles);
    } catch (error) {
      alert("取得文章失敗");
    }
  };

  useEffect(() => {
    getAllProduct();
    getArticles();
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
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });
    new Swiper(swiperRefdown.current, {
      modules: [Autoplay],
      loop: false,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 4, // 預設桌機顯示 4 張
      spaceBetween: 25,
      breakpoints: {
        1024: {
          // 桌機
          slidesPerView: 4,
          spaceBetween: 30,
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
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });
  }, []);

  const titleBreak = (title) => {
    return title.split(":").map((part, index, array) => (
      <React.Fragment key={index}>
        {part}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

    const TitleComponent = ({ title }) => {
      return <h5 className="mb-1 mt-3 p-2 text-center">{titleBreak(title)}</h5>;
    };
    

  return (
    <>
      <Swiperbanner />
      {/* 區塊1-限時優惠 */}
      <div className="timeOffer">
        <div
          className="position-absolute start-0 w-100 wave-upbg"
          style={{
            backgroundImage: "url('/src/assets/img/home/Wave 5.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            // backgroundPosition: "middlebottom center",
            transform: "translateY(-365%)",
            height: "60px",
            zIndex: "1",
          }}
        ></div>
        <div className="container">
          <div className="text-center">
            <h2 className="mb-60 fw-bold position-relative d-inline-block">
              限時優惠
              <span
                className="position-absolute w-100 bg-secondary-lg"
                style={{
                  height: "8px",
                  left: "0",
                  bottom: "-3px",
                  borderRadius: "4px",
                  opacity: "0.8",
                }}
              ></span>
            </h2>
            <div ref={swiperRefup} className="swiper">
              <div className="swiper-wrapper">
                {allProducts.map((product) => (
                  <div key={product.id} className="swiper-slide d-flex">
                    <div className="card border-0">
                      <Link to={`/information/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="img-fluid object-fit-cover"
                        />
                        <div className="card-body p-2">
                          <h4 className="mb-2 mt-2">{product.title}</h4>
                          <span className="text-primary h4">
                            NT${product.price}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-end">
                <Link
                  to="/product"
                  className="btn btn-primary py-14 px-4 mt-sm-5 text-white rounded-pill"
                >
                  立即選購
                  <img
                    src="/src/assets/img/swiper/Arrow.svg"
                    alt="Arrow"
                    className="ms-2 me-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="position-absolute start-0 w-100"
        style={{
          backgroundImage: "url('/src/assets/img/home/Wave 2.svg')",
          backgroundSize: "cover",
          height: "40px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "middlebottom center",
          zIndex: "1",
        }}
      ></div>

      {/* 區塊2-熱門+最新產品 */}
      <div className="container py-5">
        <div className="text-center">
          <h2 className="mt-120 mb-sm-60 mb-32 fw-bold position-relative d-inline-block">
            熱門產品
            <span
              className="position-absolute w-100 bg-secondary-lg"
              style={{
                height: "8px",
                left: "0",
                bottom: "-3px",
                borderRadius: "4px",
                opacity: "0.8",
              }}
            ></span>
          </h2>
        </div>
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="col-sm-6">
            <div className="d-sm-flex align-items-center gap-3">
              <div>
                <img
                  src="https://media.istockphoto.com/id/2175334376/zh/%E7%85%A7%E7%89%87/a-white-security-camera-with-a-black-lens-is-mounted-on-a-white-surface-the-camera-is-designed.jpg?s=612x612&w=0&k=20&c=DHwyncUC511tPwhKc0doiyIozyLEAsrZB_xxt6AOABo="
                  className="card-img-top rounded-4 mb-12"
                  alt="monitor1"
                />
              </div>
              <div className="d-flex flex-sm-column col-4 gap-sm-4 gap-1">
                <img
                  src="https://media.istockphoto.com/id/1552410272/zh/%E7%85%A7%E7%89%87/cat-lover-female-hands-taking-photo-her-lovely-cat-at-home-friendship-animal-lover-%C3%A2%C2%A0lifestyle.jpg?s=612x612&w=0&k=20&c=yogeX7GOiLEWCH_chW67FbJBtCc2tNhSq8FbbfE4NWw="
                  className="card-img-top rounded-4"
                  alt="monitor2"
                />
                <img
                  src="https://media.istockphoto.com/id/1635396686/zh/%E7%85%A7%E7%89%87/asia-men-using-smart-phone-connecting-to-cctv-security-at-home.jpg?s=612x612&w=0&k=20&c=5JSeOSzfi2ND3wG3W2Bji0oFckIKnLwAebNBE47BrIw="
                  className="card-img-top rounded-4"
                  alt="monitor3"
                />
                <img
                  src="https://media.istockphoto.com/id/1540473626/zh/%E7%85%A7%E7%89%87/ip-wifi-wireless-security-camera-supports-internet-installation-technology-security-systems.jpg?s=612x612&w=0&k=20&c=ORdO2wdl3fc5C7AleoXqfYy80U5dhcskcIVXctq47RA="
                  className="card-img-top rounded-4"
                  alt="monitor4"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div>
              <h2 className="text-primary mt-4">智能餵食器</h2>
              <h2 className="mb-36">工作忙碌，無法即時照顧寵物</h2>
              <p className="fs-5 mb-36">
                上班族的日常困擾：早晨匆忙出門，擔心家中毛孩子的餵食和陪伴。
                工作期間不停查看手機、心心念念掛念寵物的孤單和餓肚子
                ，卻無法立即返家。
                下班後更擔心寵物已經等待許久，體力與精神都處於疲憊狀態。
              </p>
            </div>
            <div className="d-sm-flex justify-content-between align-items-center">
              <ul className="list-unstyled fs-5">
                <li>
                  <img
                    src="/src/assets/img/home/paw.svg"
                    alt="Paw"
                    width="16"
                    height="16"
                    className="me-1"
                  />
                  遠端精準餵食
                </li>
                <li>
                  <img
                    src="/src/assets/img/home/paw.svg"
                    alt="Paw"
                    width="16"
                    height="16"
                    className="me-1"
                  />
                  即時互動通訊
                </li>
                <li>
                  <img
                    src="/src/assets/img/home/paw.svg"
                    alt="Paw"
                    width="16"
                    height="16"
                    className="me-1"
                  />
                  自動化餵食排程
                </li>
              </ul>
              <Link
                to="/product"
                className="btn btn-outline-primary py-14 px-4 text-primary rounded-pill d-flex justify-content-center"
              >
                立即選購
                <img
                  src="/src/assets/img/home/arrow.svg"
                  alt="Paw"
                  className="ms-2 me-1"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-center mt-120 mb-60 fw-bold position-relative d-inline-block">
            最新產品
            <span
              className="position-absolute w-100 bg-secondary-lg"
              style={{
                height: "8px",
                left: "0",
                bottom: "-3px",
                borderRadius: "4px",
                opacity: "0.8",
              }}
            ></span>
          </h2>
        </div>
        <div className="d-sm-flex flex-direction-reserve flex-row-reverse align-items-center justify-content-between">
          <div className="col-sm-6">
            <div className="d-sm-flex align-items-center gap-3">
              <div>
                <img
                  src="https://media.istockphoto.com/id/1364546279/zh/%E7%85%A7%E7%89%87/dog-shock-or-bark-collar-set.jpg?s=612x612&w=0&k=20&c=Iwoa3-XFgqt1MBmFN68a1uUY08-wuKf7l1x5GPZv_f8="
                  className="card-img-top rounded-4 mb-12"
                  alt="gps1"
                />
              </div>
              <div className="d-flex flex-sm-column col-4 gap-sm-4 gap-1">
                <img
                  src="https://media.istockphoto.com/id/1712521284/zh/%E7%85%A7%E7%89%87/dog-with-bark-collar-active.jpg?s=612x612&w=0&k=20&c=_WrTJZTHl5X-iaU3EAd0KpebUU3q2lDAYVo1sKloH44="
                  className="card-img-top rounded-4"
                  alt="gps2"
                />
                <img
                  src="https://media.istockphoto.com/id/1702678430/zh/%E7%85%A7%E7%89%87/dog-bark-collar-with-peep-and-vibrating-modus.jpg?s=612x612&w=0&k=20&c=ekC02S4I8tG5EcESmOiTbzu9rs5ab7L981bHbEp8OrE="
                  className="card-img-top rounded-4"
                  alt="gps3"
                />
                <img
                  src="https://media.istockphoto.com/id/2152774833/zh/%E7%85%A7%E7%89%87/backlit-dog-in-forest-with-gps-or-shock-collar-and-bear-bell.jpg?s=612x612&w=0&k=20&c=Mx6Gp0pXOi4Fkx5bZHAgm8t5BW6mpsQxv9bYCjkbc60="
                  className="card-img-top rounded-4"
                  alt="gps4"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-5">
            <div>
              <h2 className="text-primary mt-4">健康監測項圈</h2>
              <h2 className="mb-36">
                從智慧科技到滿滿愛
                <br />
                一鍵解決寵物照護難題
              </h2>
              <p className="fs-5 mb-36">
                寵物健康追蹤如同一場無形的迷宮。毛孩子不會說話，每一個異常訊號都可能被輕易忽略。
                常常在意識到問題時，疾病可能已經發展到中後期。
                缺乏專業的即時監測，讓寵物健康彷彿懸在一線之間，飼主內心總是充滿焦慮和不確定性。
              </p>
            </div>
            <div className="d-sm-flex justify-content-between align-items-center">
              <ul className="list-unstyled fs-5">
                <li>
                  <img
                    src="/src/assets/img/home/paw.svg"
                    alt="Paw"
                    width="16"
                    height="16"
                    className="me-1"
                  />
                  24小時生理數據監測
                </li>
                <li>
                  <img
                    src="/src/assets/img/home/paw.svg"
                    alt="Paw"
                    width="16"
                    height="16"
                    className="me-1"
                  />
                  AI異常預警機制
                </li>
                <li>
                  <img
                    src="/src/assets/img/home/paw.svg"
                    alt="Paw"
                    width="16"
                    height="16"
                    className="me-1"
                  />
                  運動與睡眠品質追蹤
                </li>{" "}
                <li>
                  <img
                    src="/src/assets/img/home/paw.svg"
                    alt="Paw"
                    width="16"
                    height="16"
                    className="me-1"
                  />
                  即時健康報告
                </li>
              </ul>
              <Link
                to="/product"
                className="btn btn-outline-primary py-14 px-4 text-primary rounded-pill d-flex justify-content-center"
              >
                更多新品
                <img
                  src="/src/assets/img/home/arrow.svg"
                  alt="Paw"
                  className="ms-2 me-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
      className="position-absolute start-0 w-100 wave-bg"
          style={{
            backgroundImage: "url('/src/assets/img/home/Wave 3.svg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transform: "translateY(-20%)",
            height: "60px",
            zIndex: "3",
          }}
        ></div>

      <div className="position-relative min-vh-100 d-flex align-items-center">
        <div
          className="position-absolute top-0 start-0 w-100 h-100 z-1"
          style={{
            backgroundImage: "url('/src/assets/img/home/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
          }}
        ></div>
        <div className="container">
          <div className="my-5 text-center">
            <div ref={swiperRefdown} className="swiper mt-4 mb-5">
              <h2 className="text-center mb-4 fw-bold position-relative d-inline-block">
                寵物專欄
                <span
                  className="position-absolute w-100 bg-secondary-lg"
                  style={{
                    height: "8px",
                    left: "0",
                    bottom: "-3px",
                    borderRadius: "4px",
                    opacity: "0.8",
                  }}
                ></span>
              </h2>
              <div className="swiper-wrapper">
                {articles?.map((article,index) => (
                  <div key={index} className="swiper-slide">
                    <div className="card border-0 mb-4 ">
                      <img
                        src={article.image}
                        className="card-img-top rounded-4 img-fluid object-fit-cover"
                        alt={article.title}
                      />
                      <div className="card-body p-0 text-center me-22">
                        
                        <TitleComponent title={article.title} />
                      
                        <time className="text-gray2">{article.Date}</time>
                        <p className="card-text mt-3 p-3 text-truncate">{article.description}</p>
                        <Link to={`/article`}>
                          <button className="btn btn-outline-primary rounded-pill text-primary p-12 m-2 w-100 focus:text-white">
                            閱讀更多
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 text-center">
        <h2 className=" mb-4 fw-bold position-relative d-inline-block ">
          寵物奴評價
          <span
            className="position-absolute w-100 bg-secondary-lg"
            style={{
              height: "8px",
              left: "0",
              bottom: "-3px",
              borderRadius: "4px",
              opacity: "0.8",
            }}
          ></span>
        </h2>
        <div className="row">
          {feedback.map((card, cardIndex) => (
            <div key={cardIndex} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 d-flex flex-column">
                <img src={card.img} className="img-fluid" alt={card.title} />
                <div className="card-body d-flex flex-column justify-content-center">
                  <div>
                    <h4 className="card-title">{card.title}</h4>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#fce37d"
                      >
                        <path d="m243-144 63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Z" />
                      </svg>
                    ))}
                    <p className="card-content mt-3">{card.content}</p>
                  </div>
                  <time className="card-text d-block text-gray2 mt-1 mb-3">
                    上架日期 : {card.Date}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
