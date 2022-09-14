import React from 'react';
import { Link } from 'react-router-dom';
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import axios from 'axios';

const cookies = new Cookies();

const Panier_Article_Card = ({article}) => {
    
    const Delete = (e) => {
        e.preventDefault();    
        axios.delete(process.env.React_App_API_LINK + "delete/cart/" + e.target.value, {
            headers: {
                Authorization: cookies.get("user")
            }
        }).then((res) => {
            console.log(res)
        }).cath((err) => {
            console.log(err)
        })
    }

    return (
    <Link to={'/MakeMyKeyboard/Articles/' + article.id}>
        <div className='panier_div'>
            <h1>Panier article card</h1>
            <div>
                <img src={article.image} alt="product" className='cart_img_small' />
            </div>
            <div className='text_cart_div'>
                <div className='txt_article_cart'>
                    <div className='title_artfeat'>
                        <p className='Title_txt'>{article.name}</p>
                        <p>{article.feature}</p>
                    </div>
                    <p className='Price_txt'>{article.price} €</p>
                </div>
                <div className='btn_del_pan'>
                    <button onClick={Delete} value={article.id} className='ben_txt'><i className="fa-solid fa-trash-can"></i> Delete</button>
                </div>
            </div>
        </div>
    </Link>
    );
};

export default Panier_Article_Card;