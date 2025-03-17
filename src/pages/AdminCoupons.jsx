import { useEffect, useState, useRef} from "react";
import axios from "axios";
import { Modal } from "bootstrap";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const couponModalRef = useRef(null);
  const delCouponModalRef = useRef(null);
  const [modalMode, setModalMode] = useState(null);
  const [tempCoupon, setTempCoupon] = useState({
    title: "",
    is_enabled: 1,
    percent: 50,
    due_date: Math.floor(Date.now() / 1000),
    code: "",
  });

  // 初始化 Modal
  useEffect(() => {
    new Modal(couponModalRef.current, { backdrop: false });
    new Modal(delCouponModalRef.current, { backdrop: false });
  }, []);

  // 獲取優惠券列表
  const getCoupons = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/coupons`);
      setCoupons(response.data.coupons);
    } catch (error) {
      console.error("獲取優惠劵失敗", error.response?.data || error);
    }
  };

  // 刪除優惠券
  const deleteCoupon = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`);
      if (response.status === 200 || response.status === 204) {
        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== id));
        return true;
      }
    } catch (error) {
      console.error("刪除優惠劵失敗", error.response?.data || error);
      return false;
    }
  };

  useEffect(() => {
    getCoupons();
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
  }, []);


  // 打開優惠券 Modal
  const handleOpenCouponModal = (mode, coupon) => {
    setModalMode(mode);
    setTempCoupon(
      mode === "create"
        ? {
            title: "",
            is_enabled: 1,
            percent: 50,
            due_date: Math.floor(Date.now() / 1000),
            code: "",
          }
        : coupon
    );
    const modalInstance = Modal.getInstance(couponModalRef.current);
    modalInstance.show();
  };

  // 關閉優惠券 Modal
  const handleCloseCouponModal = () => {
    const modalInstance = Modal.getInstance(couponModalRef.current);
    modalInstance.hide();
  };

  // 打開刪除優惠券 Modal
  const handleOpenDelCouponModal = (coupon) => {
    setTempCoupon(coupon);
    const modalInstance = Modal.getInstance(delCouponModalRef.current);
    modalInstance.show();
  };

  // 關閉刪除優惠券 Modal
  const handleCloseDelCouponModal = () => {
    const modalInstance = Modal.getInstance(delCouponModalRef.current);
    modalInstance.hide();
  };

  // 處理 Modal 輸入框變化
  const handleModalInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setTempCoupon({
      ...tempCoupon,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "due_date" && value) {
      const [year, month, day] = value.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      if (date.getTime()) {
        const timestamp = Math.floor(date.getTime() / 1000);
        setTempCoupon({ ...tempCoupon, [name]: timestamp });
      } else {
        console.error("Invalid date");
      }
    }
  };

  // 新增優惠券
  const createCoupon = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`, {
        data: tempCoupon,
      });
      getCoupons(); // 新增成功後重新獲取優惠券列表
      handleCloseCouponModal();
    } catch (error) {
      console.error("新增優惠券失敗", error.response?.data || error.message);
    }
  };

  // 更新優惠券
  const updateCoupon = async () => {
    try {
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`, {
        data: tempCoupon,
      });
      getCoupons(); // 更新成功後重新獲取優惠券列表
      handleCloseCouponModal();
    } catch (error) {
      console.error("更新優惠劵失敗", error.response?.data || error.message);
    }
  };

  // 處理優惠券更新或新增
  const handleUpdateCoupon = async () => {
    if (modalMode === "create") {
      await createCoupon();
    } else {
      await updateCoupon();
    }
  };

  // 處理刪除優惠券
  const handleDeleteCoupon = async () => {
    const isDeleted = await deleteCoupon(tempCoupon.id);
    if (isDeleted) {
      handleCloseDelCouponModal();
    } else {
      alert("刪除優惠劵失敗");
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-10">
            <div className="d-flex justify-content-between">
              <h2>優惠劵列表</h2>
              <button
                onClick={() => handleOpenCouponModal("create")}
                type="button"
                className="btn btn-primary"
              >
                建立新的優惠劵
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">優惠劵名稱</th>
                  <th scope="col">到期日期</th>
                  <th scope="col">折扣費用</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">代碼</th>
                  <th scope="col">操作</th>
                </tr>
              </thead>
              <tbody>
                {coupons?.map((coupon) => (
                  <tr key={coupon.id}>
                    <th scope="row">{coupon.title}</th>
                    <td>{new Date(coupon.due_date * 1000).toISOString().split("T")[0]}</td>
                    <td>{coupon.percent}</td>
                    <td>{coupon.code}</td>
                    <td>
                      {coupon.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          onClick={() => handleOpenCouponModal("edit", coupon)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenDelCouponModal(coupon)}
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

      {/* 優惠券 Modal */}
      <div
        ref={couponModalRef}
        id="couponModal"
        className="modal"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <h5 className="modal-title fs-4">
                {modalMode === "create" ? "新增優惠劵" : "編輯優惠劵"}
              </h5>
              <button
                type="button"
                onClick={handleCloseCouponModal}
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
                      value={tempCoupon.title}
                      onChange={handleModalInputChange}
                      name="title"
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="percent" className="form-label">
                      折扣百分比
                    </label>
                    <input
                      value={tempCoupon.percent}
                      onChange={handleModalInputChange}
                      name="percent"
                      id="percent"
                      type="number"
                      className="form-control"
                      placeholder="請輸入折扣百分比"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="due_date" className="form-label">
                      到期日期
                    </label>
                    <input
                      value={new Date(tempCoupon.due_date * 1000).toISOString().split("T")[0]}
                      onChange={handleModalInputChange}
                      name="due_date"
                      id="due_date"
                      type="date"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="code" className="form-label">
                      優惠劵代碼
                    </label>
                    <input
                      value={tempCoupon.code}
                      onChange={handleModalInputChange}
                      name="code"
                      id="code"
                      type="text"
                      className="form-control"
                      placeholder="請輸入優惠劵代碼"
                    />
                  </div>
                  <div className="form-check">
                    <input
                      checked={tempCoupon.is_enabled}
                      onChange={handleModalInputChange}
                      name="is_enabled"
                      type="checkbox"
                      className="form-check-input"
                      id="is_enabled"
                    />
                    <label className="form-check-label" htmlFor="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-top bg-light">
              <button
                type="button"
                onClick={handleCloseCouponModal}
                className="btn btn-secondary"
              >
                取消
              </button>
              <button
                onClick={handleUpdateCoupon}
                type="button"
                className="btn btn-primary"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 刪除優惠券 Modal */}
      <div
        ref={delCouponModalRef}
        className="modal fade"
        id="delCouponModal"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">刪除優惠劵</h1>
              <button
                onClick={handleCloseDelCouponModal}
                type="button"
                className="btn-close"
              ></button>
            </div>
            <div className="modal-body">
              你是否要刪除
              <span className="text-danger fw-bold">{tempCoupon.title}</span>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCloseDelCouponModal}
                type="button"
                className="btn btn-secondary"
              >
                取消
              </button>
              <button
                onClick={handleDeleteCoupon}
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
};

export default AdminCoupons;