import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";
import axios from "axios";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

import crudRead from "../../helpers/Read";
import Read_Panier from "../../helpers/Read_Panier";

import Panier from "../Panier/Panier";

import Navbar from "../../components/Navbar/Navbar";
import PanierCard from "../../components/Navbar/PanierCard";
const cookies = new Cookies();

const Checkout = () => {
  const [panier, setPanier] = useState(null);

  const [adresse, setAdresse] = useState(null);
  const [zip, setZip] = useState(null);
  const [ville, setVille] = useState(null);
  const [pays, setPays] = useState(null);
  const token = cookies.get("user");

  const [newAdress, setNewAdress] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newVille, setNewVille] = useState("");
  const [newPays, setNewPays] = useState("");

  useEffect(() => {
    const token = cookies.get("user");
    if (token) {
      const decode = jwt(token);
      Read_Panier("read/cart/", decode.id, setPanier, token);
    }
    const decode = jwt(token);
    axios
      .get(process.env.React_App_API_LINK + "read/user/" + decode.id, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res);
        setAdresse(res.data.street);
        setZip(res.data.zip);
        setVille(res.data.city);
        setPays(res.data.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let Total = 0;

  if (panier) {
    for (let i = 0; i < panier.length; i++) {
      Total = Total + panier[i][0].price;
    }
  }

  const Udpate = (e) => {
    e.preventDefault();
    const token = cookies.get("user");
    const decode = jwt(token);
    let user_id = decode.id;
    const Data = {
      street: adresse,
      city: ville,
      state: pays,
      zip: zip,
      headers: {
        token: token,
      },
    };

    if (token) {
      axios
        .put(process.env.React_App_API_LINK + "/user/update/" + user_id, Data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const AddAdress = (e) => {
    e.preventDefault();

    const Data = {
      street: newAdress,
      city: newVille,
      state: newPays,
      zip: newZip,
      Headers: {
        token: token,
      },
    };

    // console.log(Data);

    axios
      .post(process.env.React_App_API_LINK + "add/adresse", Data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Checkout">
      <div className="Panier_Container">
        {panier ? (
          <div className="Div_flex_cart">
            

            <div className="Div_data_user_delivery">
              <p className="Txt_data_deliveryU">Ajouter adresse</p>
              <form onSubmit={AddAdress}>
                <div className="div_livraison">
                  {/* <div className="delivery_rue_div"> */}
                    <label>
                      Adresse :
                    </label>
                      <input
                        className="Name_rue"
                        onChange={(e) => setNewAdress(e.target.value)}
                        name="adress"
                        type="text"
                      />
                  {/* </div> */}
                  {/* <div className="delivery_ville"> */}
                    <label>
                      Code postal :
                    </label>
                      <input
                        className="Data_livraisonp"
                        onChange={(e) => setNewZip(e.target.value)}
                        name="zip"
                        type="text"
                      />
                    <label>
                      Ville :
                      </label>
                      <input
                        className="Data_livraisong"
                        onChange={(e) => setNewVille(e.target.value)}
                        name="city"
                        type="text"
                      />
                    <label>
                      Pays :
                      </label>
                      <input
                        className="Data_livraisong"
                        onChange={(e) => setNewPays(e.target.value)}
                        name="country"
                        type="text"
                      />
                  {/* </div> */}
                </div>
                <button className="Data_button">Ajouter</button>
              </form>
            </div>

            <div className="Div_total_cart">
              <p className="Title_txt_total">Total</p>
              <div className="show_nb_total">
                <p className="nb_total">Nombre d'article : {panier.length} </p>
                <p className="nb_total">Prix TTC : {Total} €</p>
              </div>
              <p className="txt_petit">
                Le prix affiché n'inclut pas les frais d'expédition
              </p>
              <div>
                <Link className="Navbar_Panier_Link_btn" to="/MakeMyKeyboard/service">
                  Suivant
                </Link>
                {/* <button className="Navbar_Panier_Link_btn">Suivant</button> */}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Checkout;
