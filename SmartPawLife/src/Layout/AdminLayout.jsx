import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-sm-flex">
      <nav className="p-3 bg-gray4 text-center col-sm-2">
        <h3 className="fw-bold text-secondary">後台管理</h3>
        <ul className="list-unstyled my-2">
          <li className="p-2">
            <Link className="text-white fs-sm-5" to="/home">返回{'>'}前台首頁</Link>
          </li>
          <li className="p-2">
            <Link className="text-white fs-sm-5" to="/admin/products">「產品管理」列表</Link>
          </li>
          <li className="p-2">
            <Link className="text-white fs-sm-5" to="/admin/articles">「文章管理」列表</Link>
          </li>
          <li className="p-2">
            <Link className="text-white fs-sm-5" to="/admin/orders">「訂單管理」列表</Link>
          </li>
          <li className="p-2">
            <Link className="text-white fs-sm-5" to="/admin/coupons">「優惠劵管理」列表</Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 w-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
