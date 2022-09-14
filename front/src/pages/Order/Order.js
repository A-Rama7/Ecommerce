import React from "react";
import { useEffect, useState } from "react";

import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Order.css";

const cookies = new Cookies();
const token = cookies.get("user");

const Order = () => {
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    const Abc = async () => {
      const token = cookies.get("user");
      const decode = jwt(token);

      await axios
        .get(process.env.React_App_API_LINK + "read/Order/" + decode.id)
        .then((res) => {
          console.log(res);
          setOrder(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    Abc();
  }, []);

  // console.log(order);

  return (
    <div className="Order" id="top">
      {order
        ? order.map((tab, key) => {
            // console.log(tab);
            // console.log(key);

            return (
              <div key={key} className="Order_list">
                <Link to={"/MakeMyKeyboard/Order/" + tab.id} className="t-link Order_id">
                  <p>Numéro de commande: {tab.id}</p>
                  <p>{parseFloat(tab.price) + parseFloat(tab.total)} $</p>
                </Link>
              </div>
            );
          })
        : "Chargement..."}
    </div>
  );
};

export default Order;
