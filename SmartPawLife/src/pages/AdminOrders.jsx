import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminOrders = () => {
  const defaultModalState = {
    products: [], // 所有商品的列表
    currentProductIndex: 0, // 當前編輯的商品索引
  };

  const [orders, setOrders] = useState([]);
  const [tempOrderProduct, setTempProductOrder] = useState(defaultModalState);
  const orderProductModalRef = useRef(null);
  const [modalMode, setModalMode] = useState(null);

  useEffect(() => {
    new Modal(orderProductModalRef.current, { backdrop: false });
  }, []);

  const handleOpenOrderProductModal = (mode, order) => {
    setModalMode(mode);

    if (mode === "edit" && order) {
   
      // 將 order.products 轉換為陣列
      const products = Object.values(order.products).map((item) => ({
        ...item.product,
        quantity: item.quantity,
      }));

      // 設置 tempOrderProduct
      setTempProductOrder({
        products: products, // 所有商品的列表
        currentProductIndex: 0, // 預設編輯第一個商品
      });
    } else {
      setTempProductOrder(defaultModalState);
    }

    if (orderProductModalRef.current) {
      const modalInstance = Modal.getInstance(orderProductModalRef.current) 
                           || new Modal(orderProductModalRef.current);
      modalInstance.show();
    } else {
      console.error("Modal reference is null.");
    }
  };

  const handleCloseOrderProductModal = () => {
    const modalInstance = Modal.getInstance(orderProductModalRef.current);
    modalInstance.hide();
  };

  const getOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/orders`);
      setOrders(res.data.orders);
    } catch (error) {
      console.error("接收訂單錯誤:", error.response?.data || error);
    }
  };

  const checkUserLogin = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/user/check`);
      getOrders();
    } catch (error) {
      console.error(error);
    }
  };


  const delOrder = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`
      );
      console.log("刪除成功:", response.data);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("刪除失敗:", error);
      alert(
        `刪除失敗: ${
          error.response?.data?.message || error.message || "未知錯誤"
        }`
      );
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    checkUserLogin();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">訂購人</th>
            <th scope="col">地址</th>
            <th scope="col">電子郵件</th>
            <th scope="col">連絡電話</th>
            <th scope="col">付款狀態</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order.id}>
              <th scope="row">{index + 1}</th>
              <td>{order.user?.name}</td>
              <td>{order.user?.address}</td>
              <td>{order.user?.email}</td>
              <td>{order.user?.tel}</td>
              <td>{order?.is_paid ? "已付款" : "未付款"}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleOpenOrderProductModal("edit", order)}
                  className="btn btn-outline-primary btn-sm"
                >
                  內容
                </button>
                <button
                  type="button"
                  onClick={() => delOrder(order.id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        ref={orderProductModalRef}
        id="orderProductModal"
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">
                {modalMode === "create" ? "新增訂單" : "編輯訂單"}
              </h5>
              <button
                type="button"
                onClick={handleCloseOrderProductModal}
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="list-group">
                    {tempOrderProduct.products.map((product, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`list-group-item list-group-item-action ${
                          index === tempOrderProduct.currentProductIndex
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          setTempProductOrder((prevState) => ({
                            ...prevState,
                            currentProductIndex: index,
                          }))
                        }
                      >
                        {product.title} (數量: {product.quantity})
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-md-8">
                  {tempOrderProduct.products.length > 0 && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">
                          產品快照
                        </label>
                        <input
                          value={
                            tempOrderProduct.products[
                              tempOrderProduct.currentProductIndex
                            ].imageUrl || ""
                          }
                          name="imageUrl"
                          id="imageUrl"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                        {tempOrderProduct.products[
                          tempOrderProduct.currentProductIndex
                        ].imageUrl && (
                          <div className="mt-2">
                            <img
                              src={
                                tempOrderProduct.products[
                                  tempOrderProduct.currentProductIndex
                                ].imageUrl
                              }
                              alt="預覽圖"
                              className="img-fluid rounded"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          商品名稱
                        </label>
                        <input
                          value={
                            tempOrderProduct.products[
                              tempOrderProduct.currentProductIndex
                            ].title || ""
                          }
                          
                          name="title"
                          id="title"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          分類
                        </label>
                        <input
                          value={
                            tempOrderProduct.products[
                              tempOrderProduct.currentProductIndex
                            ].category || ""
                          }
                         
                          name="category"
                          id="category"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="unit" className="form-label">
                          單位
                        </label>
                        <input
                          value={
                            tempOrderProduct.products[
                              tempOrderProduct.currentProductIndex
                            ].unit || ""
                          }
                        
                          name="unit"
                          id="unit"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                          售價
                        </label>
                        <input
                          value={
                            tempOrderProduct.products[
                              tempOrderProduct.currentProductIndex
                            ].price || ""
                          }
                          
                          name="price"
                          id="price"
                          type="number"
                          className="form-control"
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                          數量
                        </label>
                        <input
                          value={
                            tempOrderProduct.products[
                              tempOrderProduct.currentProductIndex
                            ].quantity || 1
                          }
                        
                          name="quantity"
                          id="quantity"
                          type="number"
                          className="form-control"
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer border-top bg-light">
              <button
                type="button"
                onClick={handleCloseOrderProductModal}
                className="btn btn-secondary"
                readOnly
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;