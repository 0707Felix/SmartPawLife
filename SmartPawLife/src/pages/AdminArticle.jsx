import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


const AdminArticles= ()=> {

  const defaultModalState = {
    title: "",
    description: "",
    image: "", // 確保有圖片
    tag: [], // 確保是陣列
    create_at: Math.floor(Date.now() / 1000),
    author: "unknown",
    isPublic: false, // 確保是布林值
    content: "",
  };

  const [articles, setArticles] = useState([]);
  const articleModalRef = useRef(null);
  const delArticleModalRef = useRef(null);
  const [modalMode, setmodelMode] = useState(null);
  const [tempArticle, setTempArticle] = useState(defaultModalState);

  useEffect(() => {
    new Modal(articleModalRef.current, { backdrop: false });
    new Modal(delArticleModalRef.current, { backdrop: false });
  }, []);

  const getArticles = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/articles`
      );
      setArticles(res.data.articles);
    } catch (error) {
      alert("取得文章失敗");
    }
  };

  const checkUserLogin = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      getArticles();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getArticles();
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    checkUserLogin();
  }, []);


  const handelOpenArticleModal = (mode,article) => {
    setmodelMode(mode);
    switch (mode) {
      case "create":
        setTempArticle(defaultModalState);
        break;
      case "edit":
        setTempArticle(article);
        break;
      default:
        break;
    }

    const modalInstance = Modal.getInstance(articleModalRef.current);
    modalInstance.show();
  };
  const handelCloseArticleModal = () => {
    const modalInstance = Modal.getInstance(articleModalRef.current);
    modalInstance.hide();
  };
  const handelOpenDelArticleModal = (article) => {
    setTempArticle(article);
    const modalInstance = Modal.getInstance(delArticleModalRef.current);
    modalInstance.show();
  };
  const handelCloseDelArticleModal = () => {
    const modalInstance = Modal.getInstance(delArticleModalRef.current);
    modalInstance.hide();
  };



  const handleModalInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setTempArticle({
      ...tempArticle,
      [name]: type === "checkbox" ? checked : value, // 如果是 Checkbox，使用 checked；否則使用 value
    });
    if (name === "create_at" && value) {
      const [year, month, day] = value.split("-");
      const date = new Date(`${year}-${month}-${day}`);

      // 檢查日期是否有效
      if (date.getTime()) {
        const timestamp = Math.floor(date.getTime() / 1000); // 轉換為 Unix 時間戳
        setTempArticle({ ...tempArticle, [name]: timestamp });
      } else {
        console.error("Invalid date");
      }
    }
  };

  const createArticle = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/admin/article`,
        { ...tempArticle } // 正確的寫法
      );
    } catch (error) {
      console.error("新增文章失敗", error.response?.data || error.message);
    }
  };
  const updateArticle = async () => {
    try {
      const requestData = {
        ...tempArticle,
        isPublic:tempArticle.isPublic, // 根據後端需求，使用布林值或數字
      };

      // 發送 PUT 請求
      const res = await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/admin/article/${tempArticle.id}`,
        { data: requestData } 
      );
      alert("更新文章成功");
    } catch (error) {
      // 處理錯誤
      console.error("更新文章失敗", error.response?.data || error.message);
      alert(`更新文章失敗: ${error.response?.data?.message || error.message}`);
    }
  };
  const handleUpdateArticle = async () => {
    try {
      if (modalMode === 'create') {
        await createArticle();
      } else {
        await updateArticle();
      }
      getArticles();
      handelCloseArticleModal();
    } catch (error) {
      alert("更新文章失敗");
    }
  };
  const deleteArticle = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/article/${tempArticle.id}`
      );
    } catch (error) {
      alert("刪除文章失敗");
    }
  };
  const handleDeleteArticle = async () => {
    try {
      await deleteArticle();
      getArticles();
      handelCloseDelArticleModal();
    } catch (error) {
      alert("刪除文章失敗");
    }
  };
  return (
    <>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-10">
              <div className="d-flex justify-content-between">
                <h2>文章列表</h2>
                <button
                  onClick={() => handelOpenArticleModal("create")}
                  type="button"
                  className="btn btn-primary"
                >
                  建立新的文章
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">文章名稱</th>
                    <th scope="col">作者</th>
                    <th scope="col">日期</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {articles?.map((article,index) => (
                    <tr key={index}>
                      <th scope="row">{article.title}</th>
                      <td>{article.author}</td>
                      <td>{new Date(article.create_at * 1000)
                          .toISOString()
                          .split("T")[0]}</td>
                      <td>
                        {article.isPublic ? (
                          <span className="text-success">啟用</span>
                        ) : (
                          <span>未啟用</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group">
                          <button
                            type="button"
                            onClick={() =>
                              handelOpenArticleModal("edit", article)
                            }
                            className="btn btn-outline-primary btn-sm"
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            onClick={() => handelOpenDelArticleModal(article)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            刪除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
     
      <div
        ref={articleModalRef}
        id="articletModal"
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">
                {modalMode === "create" ? "新增文章" : "編輯文章"}
              </h5>
              <button
                type="button"
                onClick={handelCloseArticleModal}
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      標題
                    </label>
                    <input
                      value={tempArticle.title}
                      onChange={handleModalInputChange}
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="author" className="form-label">
                      作者
                    </label>
                    <input
                      value={tempArticle.author}
                      onChange={handleModalInputChange}
                      name="author"
                      id="author"
                      type="text"
                      className="form-control"
                      placeholder="請輸入作者"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="create_at" className="form-label">
                      日期
                    </label>
                    <input
                      value={
                        new Date(tempArticle.create_at * 1000)
                          .toISOString()
                          .split("T")[0]
                      } // 將 Unix 時間戳轉為 yyyy-mm-dd 格式
                      onChange={handleModalInputChange}
                      name="create_at"
                      id="create_at"
                      type="date"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      圖片 URL
                    </label>
                    <input
                      value={tempArticle.image}
                      onChange={handleModalInputChange}
                      name="image"
                      id="image"
                      type="text"
                      className="form-control"
                      placeholder="請輸入圖片 URL"
                    />
                    {/* 圖片預覽 */}
                    {tempArticle.image && (
                      <div className="mt-2">
                        <img
                          src={tempArticle.image}
                          alt="預覽圖"
                          className="img-fluid rounded"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      商品描述
                    </label>
                    <textarea
                      value={tempArticle.description}
                      onChange={handleModalInputChange}
                      name="description"
                      id="description"
                      className="form-control"
                      rows={4}
                      placeholder="請輸入商品描述"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      說明內容
                    </label>
                    <textarea
                      value={tempArticle.content}
                      onChange={handleModalInputChange}
                      name="content"
                      id="content"
                      className="form-control"
                      rows={4}
                      placeholder="請輸入說明內容"
                    ></textarea>
                  </div>
                  <div className="form-check">
                    <input
                      checked={tempArticle.isPublic}
                      onChange={handleModalInputChange}
                      name="isPublic"
                      type="checkbox"
                      className="form-check-input"
                      id="isPublic"
                    />
                    <label className="form-check-label" htmlFor="isPublic">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-top bg-light">
              <button
                type="button"
                onClick={handelCloseArticleModal}
                className="btn btn-secondary"
              >
                取消
              </button>
              <button
                onClick={handleUpdateArticle}
                type="button"
                className="btn btn-primary"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={delArticleModalRef}
        className="modal fade"
        id="delArticleModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">刪除產品</h1>
              <button
                onClick={handelCloseDelArticleModal}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                // aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              你是否要刪除
              <span className="text-danger fw-bold">{tempArticle.title}</span>
            </div>
            <div className="modal-footer">
              <button
                onClick={handelCloseDelArticleModal}
                type="button"
                className="btn btn-secondary"
              >
                取消
              </button>
              <button
                onClick={handleDeleteArticle}
                type="button"
                className="btn btn-danger"
              >
                刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminArticles;
