import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PanierCard from "../../components/Navbar/PanierCard";
import crudRead from "../../helpers/Read";
import { Link } from "react-router-dom";
import "./Pan.css";
// import "../App.css";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import Read_Panier from "../../helpers/Read_Panier";
import Cart from "../../helpers/Cart";
import axios from "axios";

import Checkout from "../Checkout/Checkout";
import Panier_Article_Card from "../../components/Panier/Panier_Article_Card";
import { ChangeContext } from "../../Context/Change";
import { CartContext } from "../../Context/Cart";

const cookies = new Cookies();
const token = cookies.get("user");


const Panier = () => {
  const {cart, save, add, remove, changeQuantity, getNumberArticle, getTotalPrice} = useContext(CartContext)
  // console.log(cart);
  const {change, changeChange} = useContext(ChangeContext)

  // const number = 0
  const [panier, setPanier] = useState(null);
  const [panier2, setPanier2] = useState(null);
  const [nbOrder, setNbOrder] = useState(null);
  const [style, setStyle] = useState(0)

  useEffect(() => {
    const token = cookies.get("user");
    if (token) {
      const decode = jwt(token);
      Read_Panier("read/cart/", decode.id, setPanier, token);
    } else {
      // console.log(cart);
      if(cart != null){
          setPanier2(cart);
      }
      else{
          setPanier2(JSON.parse(localStorage.getItem("cart")))
      }
    }
  }, [change, cart]);



  let Total = 0;
  let price = 0;
  let length = 0;
  let width = 0;
  let height = 0;
  let weight = 0;
  if (panier) {
    for (let i = 0; i < panier.length; i++) {
      Total = Total + panier[i][0].price;
      length = length + parseFloat(panier[i][0].length);
      width = width + parseFloat(panier[i][0].width);
      height = height + parseFloat(panier[i][0].height);
      weight = weight + parseFloat(panier[i][0].weight);
    }
  }

  if (panier2) {
    price = getTotalPrice();
    length = getNumberArticle();
    Total =  getTotalPrice();
  }

const mouseOn=(e) => {
    setStyle(1)
}

const mouseOut=(e) => {
    setStyle(0)
}
  
    // console.log(panier2);
  return (    
  <div className='Cart'>
  {/* <Navbar /> */}
  <div className='Panier_Container'>
    <h1>PANIER</h1>
      <div className='Div_flex_cart'>
      {panier ?
          <div className="Cart_flex">
              {panier.map((tab, index) =>
                  <PanierCard key={index} article={tab[0]}/>
              )}
          </div>
          :
          <div className="Cart_flex">
              {panier2 ? 
              <>
              <div className={style === 1 ? "LoginRegister_fond" : 'LoginORregister_none'}>
              <div className={style === 1 ?  'LoginORregister' : 'LoginORregister_none'}>
                <span  className='LoginORregister_close' onClick={mouseOut}>X</span>
                <h2 className='LoginORregister_title'>Pour pouvoir acheter vous devez vous connecter</h2>
                <Link to="/Login" className='LoginORregister_r'>Connectez vous</Link>
                <Link to="/Register" className='LoginORregister_r'>Inscrivez vous</Link>
                {/* <p to="/" className='LoginORregister_r'>Payer directement</p> */}
              </div>
              </div>
              {panier2.map((tab) => 
                <PanierCard key={tab.id} article={tab} />
              )}
              </>
              :
              <> 
              <h1>Panier</h1>
              <h1>Panier vide</h1>
              </>
              }
          </div>
      }

          <div className='Div_total_cart'>
              <p className='Title_txt_total'>Total</p>
              <div className='show_nb_total'>
                  {panier ? 
                    <p className='nb_total'>Nombre d'article : {panier.length}</p>
                    :
                    <p className='nb_total'>Nombre d'article :</p>
                  }
                  <p className='nb_total'>Prix TTC : {Total} €</p>
              </div>
              <p className='txt_petit'>Le prix affiché n'inclut pas les frais d'expédition</p>
              <div>
                  {panier2 ?
                    <button className='Navbar_Panier_Link_btn' onClick={mouseOn}>ACHETER</button>
                  :
                  <Link to='/MakeMyKeyboard/Checkout'>
                      <button className='Navbar_Panier_Link_btn'>ACHETER</button>
                  </Link>
                  }
              </div>
          </div>
      </div>
  </div>
</div>
  );
};

export default Panier;
