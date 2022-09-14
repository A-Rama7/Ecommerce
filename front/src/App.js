import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";

//Pages
import Home from "./pages/Home/Home";
import Register from "./pages/LoginRegister/Register";
import Login from "./pages/LoginRegister/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Admin from "./pages/Admin/Admin";
import Article_list from "./pages/Articles/Article_list";
import Article_detail from "./pages/Articles/Article_detail";
import ExpKeyboard from "./pages/BuildKeyboard/ExpKeyboard";
import Checkout from "./pages/Checkout/Checkout";
import Panier from "./pages/Panier/Panier";
import Service from "./pages/Service/Service";
import Order from "./pages/Order/Order";
import Order_details from "./pages/Order/Order_details";
import DownloadCustomersData from "./pages/DownloadCustomersData/DownloadCustomersData";

//Components
import AdminShowArticle from "./components/Admin/AdminShowArticle";
import AdminCreateArticle from "./components/Admin/AdminCreateArticle";
import Admin_Category from "./components/Admin/Admin_Category";
import Admin_CreateCategory from "./components/Admin/Admin_CreateCategory";
import Admin_Home from "./components/Admin/Admin_Home";
import CreditCardPayment from "./components/BankCard/CreditCardPaymentForm";
import MakeMyKeyboard from "./pages/MakeMyKeyboard/MakeMyKeyboard";
import { CartContext } from "./Context/Cart";

let cart = localStorage.getItem("cart");
const cookies = new Cookies();

function App() {
  const {cart, save, add, remove, changeQuantity, getNumberArticle, getTotalPrice} = useContext(CartContext)

  const [admin, setAdmin] = useState(0);
  const navigate = useNavigate();

    //AREVOIR
  useEffect(() => {
    const cookie = cookies.get("user");
    if (!cookie) {
      cookies.remove("user");
      cookies.remove("admin");
      // navigate("/login", { replace: true });
    } else {
      // navigate("/");
    }
  }, [navigate]);

  //AREVOIR
  useEffect(() => {
    const cookie = cookies.get("admin");
    if (cookie === "1") {
      setAdmin(1);
    }
  }, [admin]);

  useEffect(() => {
    // console.log(cart);
  }, [cart])

  const tryCatch = () => {
    add({id:1,name:"test"})
  };


  return (
    <div className="App">
      {/* <button onClick={tryCatch}>test</button> */}
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/MakeMyKeyboard" element={<MakeMyKeyboard />}>
          <Route path="/MakeMyKeyboard/" element={<Home />} />
          <Route path="/MakeMyKeyboard/Articles" element={<Article_list />} />
          <Route path="/MakeMyKeyboard/Articles/:id" element={<Article_detail />} />
          <Route path="/MakeMyKeyboard/payment" element={<CreditCardPayment/>}/>
          <Route path="/MakeMyKeyboard/Panier" element={<Panier />} />
          <Route path="/MakeMyKeyboard/Order" element={<Order />} />
          <Route path="/MakeMyKeyboard/Order/:id" element={<Order_details />} />
          <Route path="/MakeMyKeyboard/Checkout" element={<Checkout />} />
          <Route path="/MakeMyKeyboard/Service" element={<Service />}/>
          <Route path="/MakeMyKeyboard/Explication" element={<ExpKeyboard />} />
        </Route>

        <Route path="/Admin" element={<Admin />}>
          <Route path="/Admin/Home" element={<Admin_Home />} />
          <Route path="/Admin/ShowArticle" element={<AdminShowArticle />} />
          <Route path="/Admin/CreateArticle" element={<AdminCreateArticle />} />
          <Route path="/Admin/Category" element={<Admin_Category />} />
          <Route path="/Admin/CreateCategory" element={<Admin_CreateCategory />} />
          <Route path="/Admin/DownloadCustomersData" element={<DownloadCustomersData/>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
