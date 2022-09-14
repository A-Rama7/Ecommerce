import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./Article_detail.css";
import Cookies from "universal-cookie";
import { useOutletContext } from "react-router-dom";

import { ChangeContext } from "../../Context/Change";
import { CartContext } from "../../Context/Cart";
import Commentaire from "../../components/Commentaires/Commentaire";
import jwt from "jwt-decode";

const cookies = new Cookies();

const Article_detail = ({ name }) => {
  
    let fullUrl = window.location.pathname;
    let urlid = fullUrl.split("/").pop();

  const { cart, save, add, remove, changeQuantity, getNumberArticle, getTotalPrice } = useContext(CartContext)
  const { change, changeChange } = useContext(ChangeContext)

  const [article, setArticle] = useState(null);
  const [commentaire, setCommentaire] = useState(null)
  const [newComment, setNewComment] = useState(0)
  // console.log(urlid);

  useEffect(() => {
    const token = cookies.get("user");
    if(token){
      const decode = jwt(token);
      let user_id = decode.id;
      let user_name = decode.username;
      // console.log(decode);
      setNewComment({userId: user_id, articleId: urlid})
    }
  }, [])

  const inputsHandler = (e) =>{
    let objectContent = newComment;
    let objectNewContent = {[e.target.name]: e.target.value}
    setNewComment({...objectContent, ...objectNewContent});
    // console.log(newComment);
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      // crudCreate("create/category", newComment)

      axios.post(
        process.env.React_App_API_LINK + `create/comment`, newComment
      )
      .then((res) => {
        changeChange(change + 1);
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {
    const token = cookies.get("user");
    if(token){
      const decode = jwt(token);
      let user_id = decode.id;
      let user_name = decode.username;
      // console.log(decode);
      axios.get(process.env.React_App_API_LINK + "read/comment/" + urlid, {
        headers: { Authorization: token }
      })
    .then((res) => {
      setCommentaire(res.data)
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  }, [change])
  // console.log(commentaire);

  useEffect(() => {
    axios
      .get(process.env.React_App_API_LINK + `articles/read/${urlid}`)
      .then((resp) => {
        setArticle(resp.data);
      });
  }, [urlid]);

  // useEffect(() => {
  //   axios
  //     .get(process.env.React_App_API_LINK + `articles/read/${urlid}`)
  //     .then((resp) => {
  //       setArticle(resp.data);
  //     });
  // }, [urlid]);

  const addToCart = (e) => {
    e.preventDefault();
    const token = cookies.get("user");
    if (token) {
      axios
        .post(process.env.React_App_API_LINK + "create/cart/item", {
          article: article.id,
          Headers: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res);
          changeChange(change + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let addObj = { add: "add" }
      changeChange({ ...article, ...addObj });
    }
  };

  return (
    <>
      {article ?
        <div>

          <div>
            <div className="article_detail">

              <div className="div-img">
                <img className="img-art" src={article.image} alt="Img_article" />
              </div>

              <div className="detail-art">
                <h1 className="Title-art">{article.name}</h1>
                <p className="Desc-art">{article.description}</p>
              </div>

              <div className="Select">

                <div className="Select-art">
                  <div className="Div-Titre">
                    <p className="Title-sel">Matériaux</p>
                  </div>

                  <form className="Select_inp">
                    <button type='button' name="1" value="25" className="input-art">
                      Bois
                    </button>
                    <button type='button' name="1" value="32" className="input-art">
                      Métal
                    </button>
                    <button type='button' name="1" value="18" className="input-art">
                      Plastique
                    </button>
                  </form>
                </div>

                <div className="Select-art">
                  <div className="Div-Titre">
                    <p className="Title-sel">Couleur</p>
                  </div>
                  <form className="Select_inp">
                    <button type='button' name="2" value="16" className="input-artu">
                      Rouge
                    </button>
                    <button type='button' name="2" value="43" className="input-artu">
                      Bleu
                    </button>
                    <button type='button' name="2" value="4" className="input-artu">
                      Vert
                    </button>
                  </form>
                </div>

              </div>

              <div className="PriBuy">
                {article.reduction != null ? <h2 className="Price-art"> <s>{article.price}</s> - {article.reduction}% = {article.price - (article.price * article.reduction / 100)}€</h2> : <h2 className="Price-art">{article.price} €</h2>}

                {article && article.quantity === 0 ?
                  <button className="NoStock">Hors stock</button>
                  :
                  <button className="stock" onClick={addToCart}> Ajouter au panier</button>
                }
              </div>
            </div>
            
              {commentaire ? 
            <div className="article_detail_commentaire">
              <h1>Commentaires</h1>

              <form className="article_detail_commentaire_send">
                <input type="text" name='comment' placeholder='' onChange={inputsHandler}/>
                <button onClick={handleSubmit}>Envoyer un commentaire</button>
              </form>

                <div>
                  {commentaire.map(tab =>
                    <Commentaire key={tab.id} Commentaire={tab} />
                  )} 
                </div>
            </div>
              :
              ""
              }


          </div>
        </div>

        :
        <h1>cette page est en chargement</h1>
      }
    </>
  );
};

export default Article_detail;