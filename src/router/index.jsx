import FrontLayout from '../Layout/FrontLayout'
import { createHashRouter } from 'react-router';
import Home from '../pages/Home';
import Product from '../pages/Product';
import About from '../pages/About';
import Member from '../pages/Member';
import Information from '../pages/Information';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Article from '../pages/Article';
import CheckoutForm from '../pages/ChectoutForm';
import PayOk from '../pages/PayOk';
import ChectoutWay from '../pages/ChectoutWay';
import AdminLayout from '../Layout/AdminLayout';
import AdminProducts from '../pages/AdminProducts';
import AdminArticles from '../pages/AdminArticle';
import NotFound from '../pages/NotFound';
import ProtectedRoute from "../pages/ProtectedRoute"; // **✅ 加入 ProtectedRoute**
import AdminOrders from '../pages/AdminOrders';
import AdminCoupons from '../pages/AdminCoupons';

const routes = createHashRouter([
{
   path: '/',
   element:<FrontLayout />,
   children:[
    {
        path:'home',
        element: <Home />
    },
    {
        path:'product',
        element: <Product />
    },
    {
        path:'information/:id',
        element:<Information />
    },
    {
        path:'article',
        element: <Article />
    },
    {
        path:'about',
        element: <About />
    },
    {
        path:'member',
        element: <Member />
    },
    {
        path:'cart',
        element: <Cart />
    },
    {
        path:'login',
        element: <Login />
    },
    {
        path:'checkoutform',
        element: <CheckoutForm />
    },
    {
        path:'checkoutway',
        element: <ChectoutWay />
    },
    {
        path:'payok',
        element: <PayOk />
    },
    { path: '*', element: <NotFound /> }, // 捕捉所有未定義的前台路由
   ]
},
{
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element:<Login /> }, // **後台登入不需要保護**
      {
        element: <ProtectedRoute />, // **✅ 受保護的後台區域**
        children: [
          { index: true, element: <AdminProducts /> }, 
          { path: "products", element: <AdminProducts /> },
          { path: "articles", element: <AdminArticles /> },
          { path: "orders",   element: <AdminOrders /> },
          { path: "coupons",  element: <AdminCoupons /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;