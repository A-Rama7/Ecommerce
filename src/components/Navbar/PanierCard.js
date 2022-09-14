import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './panier.css';
import axios from 'axios';
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { ChangeContext } from '../../Context/Change';
import { AddQuantityPanier2Context } from '../../Context/AddQuantityPanier2';
import { RemoveQuantityPanier2Context } from '../../Context/RemoveQuantityPanier2';
import { CartContext } from '../../Context/Cart';
const cookies = new Cookies();

const PanierCard = ({article, fraisPort}) => {
    const {cart, save, add, remove, changeQuantity, getNumberArticle, getTotalPrice} = useContext(CartContext)
    const {change, changeChange} = useContext(ChangeContext)
    const {addQuantityPanier2, changeAddQuantityPanier2} = useContext(AddQuantityPanier2Context)
    const {removeQuantityPanier2, changeRemoveQuantityPanier2} = useContext(RemoveQuantityPanier2Context)
    
// console.log(cookies.get("user"));

    const Delete = async (e) => {
        e.preventDefault();
        const token = cookies.get("user");

        if(token){
            // console.log('tu fera une requete a la db');

                    // const decode = jwt(token);
            const id = e.target.value;
            // console.log(process.env.React_App_API_LINK+ "delete/cart/" + id)
            await  axios.delete(process.env.React_App_API_LINK+ "delete/cart/" + id, {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                changeChange(change +1);
            }).cath((err) => {
                console.log(err)
            })
        }else {
            // let deleteObj = {delete : "delete"}
            // changeChange({...article, ...deleteObj});
            remove(article)
            // console.log(article);
        }
    }

    const callAddQuantity = () =>{
        changeAddQuantityPanier2(article)
    }

    const callRemoveQuantity = () =>{
        changeRemoveQuantityPanier2(article)
    }

    return (
        <div className='changecette'>
            {/* <h1>PanierCard</h1> */}
            <p>{article.name}</p>
            <p>{article.price} €</p>
            {/* <p> frais de port : {fraisPort} €</p> */}
            {cookies.get("user") ? 
            <></>
        :   
            <>
            <button onClick={callRemoveQuantity}>-</button>
            <p>{article.quantity}</p>
            <button onClick={callAddQuantity}>+</button>
            </>
    }
            <button onClick={Delete} value={article.id} className='ben_txt'><i className="fa-solid fa-trash-can"></i> Delete</button>
        </div>
    );
};

export default PanierCard;
