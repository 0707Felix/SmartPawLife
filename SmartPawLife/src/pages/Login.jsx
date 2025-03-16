import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/v2/admin/signin`, account);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      navigate("/admin"); // 成功登入後導向後台主頁
    } catch (error) {
      setError("登入失敗，請檢查帳號或密碼");
    }
  };

  return (
    <div className="container">
        <h1 className="mt-80 mb-4 text-center">使用者後台登入系統</h1>
        {error && <div className="alert alert-danger w-50 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="d-flex flex-column align-items-center gap-3 p-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label fs-4 fw-bold">帳號</label>
            <input
              type="email"
              className="form-control"
              id="username"
              name="username"
              value={account.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fs-4 fw-bold">密碼</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={account.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary fs-3 mb-120">
            登入
          </button>
        </form>
      </div>

  );
};

export default Login;
