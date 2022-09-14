import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { ReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import OrderCss from "./Order.css";


import Cookies from "universal-cookie";
import jwt from "jwt-decode";
const cookies = new Cookies();

export default function Order_details() {
  const [article, setArticle] = useState(null);
  const [rateService, setRateService] = useState(null);
  const params = useParams();
  const Ref = useRef();
  const [user, setUser] = useState(null)
  let yourDate = new Date()

  const [dbDate, setDbDate] = useState(null)

  useEffect(()=>{
    if(rateService){
  
     setDbDate(new Date(rateService.creationDate))
    
      // console.log(rateService.currentDate);
      // console.log(dbDate);
      // let result2 = dbDate.setDate(yourDate.getDate() + 2)
      // console.log(yourDate.getTime());
  
      // console.log(dbDate.getTime() + 172800000  );
  
      // console.log( yourDate.toISOString().split('T')[0] == rateService.currentDate);
    }
  },[rateService])
  // console.log(dbDate.getTime());
  // console.log(yourDate.getTime());
  // console.log(dbDate.getTime() + 172800000 < yourDate.getTime() + 259200000);
  useEffect(() => {
    const token = cookies.get("user");
    if(token){
      const decode = jwt(token);
      setUser(decode);
      // console.log(decode);
    }
  }, [])
  // console.log(user);

  useEffect(() => {
    const Async = async () => {
      await axios
        .get(process.env.React_App_API_LINK + "read/Order_item/" + params.id)
        .then((res) => {
          // console.log(res);

          setArticle(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    Async();
  }, [params]);

  useEffect(() => {
    const Async = async () => {
      await axios
        .get(process.env.React_App_API_LINK + "read/order/" + params.id)
        .then((res) => {
          // console.log(res);

          setRateService(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    Async();
  }, [params]);

  // console.log(article)

  let total = 0;

  if (article) {
    let articleLength = article.length;
    // console.log(article[0][0].price)

    for (let i = 0; i < articleLength; i++) {
      total += article[i][0].price
    }
  }
  // console.log(total)

// console.log(rateService);

  return (
    <>
        <ReactToPrint
          trigger={() => {
            return <button className="facture_button">Print command</button>;
          }}
          content={() => Ref.current}
          pageStyle="print"
        />
        <div id="top" ref={Ref}>
        {/* <div ref={Ref}>
          
          {rateService ? (
            <>
              <p>{"Frai De Port : " + rateService.price + "€ "}</p>
              <h1>Total : {parseFloat(total) + parseFloat(rateService.price)}</h1>
              <p>{"Service : " + rateService.service}</p>
            </>
          ) : null}
        </div> */}
  
        <h1>FACTURE</h1>
        {/* <div className="facture_user"> */}
          {user ? 
          <div className="facture_user">
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        :
        <div className="facture_user">
        <p>prenom</p>
        <p>email</p>
      </div>
        
        }
        {/* </div> */}

        <div className="facture_entreprise">
          <p>MakeMyKeyboard</p>
          <p>123 rue epitech</p>
          <p>Le Kremlin Bicetre</p>
        </div>

        <div className="facture_content">
          <p>Merci d'avoir commandé chez nous !</p>

          <table>
            <thead>
          <tr>
              <td className="red">Article</td>
              <td className="red">Prix</td>
              </tr>
              </thead>
            <tbody>
              {article
                ? article.map((tab, key) => {
                    return (
                      <tr key={key}>
                        <td>{tab[0].name}</td>
                        <td>{tab[0].price}€</td>
                      </tr>
                    );
                  })
                : null}
              <tr> 
                  <td className="red">service</td>
                  <td className="red">frais de port</td>
              </tr>
                {rateService ? (
                    <>                    <tr>
                      <td>{rateService.service}</td>
                      <td>{rateService.price}€</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>Total : {parseFloat(total) + parseFloat(rateService.price)}</td>
                    </tr>
                    </>

                  ) : null}
            </tbody>
          </table>
          
          <img src="/imports/logofacture.png" alt="logo" className="Facture_Img"></img>
        </div>

      </div>
        <div className="Facture_Suivi_Livraison">
            <h1>Suivi de livraison</h1>

{dbDate ? 
            <div className="Facture_Suivi_Livraison_status">
              <div>
                <p>Commander</p>
                <div className={dbDate ? "circle green": "circle"}></div>
              </div>

              <div>
                <p>En cours de traitement</p>
                {/* date de la db + 2jour < date du jour  */}
                <div className={dbDate.getTime() + 172800000 < yourDate.getTime() ? "circle green": "circle"}></div>
              </div>

              <div>
                <p>En cours de livraison</p>
                <div className={dbDate.getTime() + 259200000 < yourDate.getTime() ? "circle green": "circle"}></div>
              </div>

              <div>
                <p>Livré !</p>
                <div className={dbDate.getTime() + 345600000 < yourDate.getTime()  ? "circle green": "circle"}></div>
              </div>
            </div>
:
<></>
}
        </div>
    </>
  );
}
