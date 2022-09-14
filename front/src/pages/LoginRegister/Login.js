import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

import "../../App.css";
import { CartContext } from "../../Context/Cart";

const cookies = new Cookies();

const Register = () => {
  const {cart, save, add, remove, changeQuantity, getNumberArticle, getTotalPrice} = useContext(CartContext)

  const navigate = useNavigate();

  const [newLogin, setNewLogin] = useState({})
  const [panier2, setPanier2]= useState(null);
  const [wrong, setWrong] = useState(false);

  const inputsHandler = (e) =>{
    let objectContent = newLogin;
    let objectNewContent = {[e.target.name]: e.target.value}
    setNewLogin({...objectContent, ...objectNewContent});
  }
  
  // //AREVOIR
  useEffect(() => {
    if(cart != null){
      setPanier2(cart);
    }
    if(localStorage.getItem("cart")){
        setPanier2(JSON.parse(localStorage.getItem("cart")))
    }
  }, [])
  // console.log(panier2);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(process.env.React_App_API_LINK + "api/login", newLogin)
      .then((res) => {
        if (
          res.data !== "mauvais mdp" &&
          res.data !== "mauvais email ou password"
        ) {
          const decode = jwt(res.data);

          document.cookie = "user=" + res.data + "; expires=Wed, 05 Aug 2024 23:00:00 UTC; path=/";
          document.cookie = "admin=" + decode.admin +"; expires=Wed, 05 Aug 2024 23:00:00 UTC; path=/";



          const token = cookies.get("user");
          // console.log(token);
          
          if(token){
            for(let i =0; i<panier2.length; i++){
              // console.log(i);
                // console.log(panier2[i].id);

                axios
                  .post(process.env.React_App_API_LINK + "create/cart/item", {
                    article: panier2[i].id,
                    service: panier2[i].service,
                    Headers: {
                      token: token,
                    },
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                  // console.log(panier2[i]);
                  // remove(panier2[i])
            }
            localStorage.removeItem("cart");
            // localStorage.setItem("cart", "test");
            var names = [];
            localStorage.setItem("cart",  JSON.stringify(names));
// localStorage.setItem("names", JSON.stringify(names));
          navigate("/MakeMyKeyboard/");
          }
        } else {
          setWrong(true);
          console.log("email ou mdp incorect");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Box">

      <div className="Box1">
        <h1 className="LogTxtTitle">Bienvenue !</h1>
        <p className="LogTxt">Pas encore de compte ?</p>
        <p className="LogTxt">Inscris toi !</p>
        <div className="divbtn">
          <Link className="BtnLog" to="/Register">
            Inscription
          </Link>
        </div>
      </div>

      <div className="Box2">
        <h1 className="FormTitle">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <input type="email" name="email"  placeholder="Email" onChange={inputsHandler} className="input"/>
            <input type="password" name="password" placeholder="Mot de passe" onChange={inputsHandler} className="input"/>
          </div>
          <button className="btn-form">Send</button>
        </form>

        {wrong ? "email ou mot de passe incorect" : null}
      </div>

    </div>
  );
};

export default Register;