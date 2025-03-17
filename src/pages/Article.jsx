import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const Article = () => {
  const [articles, setArticles] = useState([]);
  const getArticles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/articles`);
      setArticles(res.data.articles);
    } catch (error) {
      console.error("取得文章失敗", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <>
      <div className="article d-flex align-items-center justify-content-center">
        <div className="text-white p-2">
          <h1>關於 SmartPaw Life</h1>
          <p>智能寵物，提供毛孩最優質的照顧，為你打造更多美好時光</p>
        </div>
      </div>
      {articles?.map((article, index) => (
        index % 2 === 0 ? (
          <div key={article.title} className="bg-primary-lg">
            <div className="container">
              <div className="row my-5">
                <h4 className="display-4 font-weight-bold mb-3 text-center">
                  {article.title}
                </h4>
                <div className="d-sm-flex align-items-center justify-content-center gap-3">
                  <img
                    className="col-sm-5 img-fluid"
                    src={article.image}
                    alt={article.title}
                  />
                  <div className="col-sm-5">
                    <p className="lead p-3 lh-lg">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key={article.title} className="container">
            <div className="row my-5">
              <h4 className="display-4 font-weight-bold mb-3 text-center">
                {article.title}
              </h4>
              <div className="d-sm-flex align-items-center justify-content-center gap-3">
                <div className="col-sm-5">
                  <p className="lead p-3 lh-lg">
                    {article.description}
                  </p>
                </div>
                <img
                  className="col-sm-5 img-fluid"
                  src={article.image}
                  alt={article.title}
                />
              </div>
            </div>
          </div>
        )
      ))}
    </>
  );
};

export default Article;