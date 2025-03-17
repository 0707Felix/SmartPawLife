# Smart Paw Life - React + Vite

## 🚀 專案簡介
Smart Paw Life 是一個基於 Vite 的 React 應用，提供登入驗證、商品管理、購物車功能，並使用 GitHub Pages 進行部署。

## 📌 技術棧
- **開發框架**：React 18 + Vite
- **狀態管理**：Redux (用於購物車數據管理)
- **UI 框架**：Bootstrap
- **API 請求**：Axios
- **路由管理**：React Router
- **登入驗證**：Cookies 驗證
- **CSS 預處理器**：SCSS
- **部署**：GitHub Pages

## 📂 專案結構

```
📦 SmartPawLife
├── 📂 public               # 靜態資源
│   ├── 📂 img              # 圖片資源
├── 📂 src                  # 原始碼目錄
│   ├── 📂 assets           # 樣式與靜態資源
│   │   ├── 📂 helpers      # SCSS 變數與全域設定
│   │   ├── 📂 Layout       # 頁面對應的 SCSS 樣式
│   ├── 📂 components       # 可重用的元件
│   │   ├── 📂 common       # 共同元件（Header、Footer）
│   │   ├── 📂 Layout       # 頁面佈局元件
│   ├── 📂 pages            # 各個頁面
│   ├── 📂 redux            # Redux 狀態管理
│   ├── 📂 router           # 路由設定
│   ├── App.jsx             # 主要應用元件
│   ├── main.jsx            # 入口檔案，包含 Provider 與 Router
│   ├── index.css           # 全域 CSS
├── .env.example            # 環境變數範例
├── .gitignore              # Git 忽略清單
├── package.json            # 依賴與指令
├── vite.config.js          # Vite 設定
├── README.md               # 專案說明文件
```

## 📜 安裝與使用
### 1️⃣ 安裝專案依賴
```bash
npm install
```

### 2️⃣ 啟動開發伺服器
```bash
npm run dev
```

### 3️⃣ 打包專案
```bash
npm run build
```

### 4️⃣ 項目部署到 GitHub Pages
1. 在 `vite.config.js` 設置 `base` 為你的 GitHub Repo 名稱：
   ```js
   export default defineConfig({
     base: '/你的GitHubRepo名稱/',
   })
   ```
2. 執行指令：
   ```bash
   npm run deploy
   ```

## 🔑 登入驗證
- 登入 API 會使用 **Cookies** 儲存 Token
- 每次發送請求時，需確保 `axios.defaults.headers.common["Authorization"] = token;`

## 📌 Redux 狀態管理
- `redux/store.js` 負責全局狀態
- `購物車數據` 透過 Redux 存儲與管理

## 📌 路由設定
- `router/index.jsx` 定義所有頁面路由
- 使用 `ProtectedRoute` 保護後台頁面

## 📌 SCSS 樣式管理
- `assets/helpers/_variables.scss` 設定全域變數
- `assets/Layout/*.scss` 依據頁面區分樣式


