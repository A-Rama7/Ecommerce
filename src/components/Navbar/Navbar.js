import React, { useContext, useEffect, useState } from "react";
import navbar from "./navbar.css";
import { Link, Navigate } from "react-router-dom";
import { Route, Routes, useNavigate } from "react-router-dom";
import crudRead from "../../helpers/Read";
import axios from "axios";
import PanierCard from "./PanierCard";

import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import Read_Panier from "../../helpers/Read_Panier";
import { ChangeContext } from "../../Context/Change";
import { AddQuantityPanier2Context } from "../../Context/AddQuantityPanier2";
import { RemoveQuantityPanier2Context } from "../../Context/RemoveQuantityPanier2";
import { CartContext } from "../../Context/Cart";

const cookies = new Cookies();


function Navbar() {
    const { cart, save, add, remove, changeQuantity, getNumberArticle, getTotalPrice, trytry, changeCart } = useContext(CartContext)
    const { change, changeChange } = useContext(ChangeContext)
    const { addQuantityPanier2, changeAddQuantityPanier2 } = useContext(AddQuantityPanier2Context)
    const { removeQuantityPanier2, changeRemoveQuantityPanier2 } = useContext(RemoveQuantityPanier2Context)

    //affiche ou pas le panier
    const [style, setStyle] = useState(0);

    //Contenue du panier
    const [panier, setPanier] = useState(null);
    const [panier2, setPanier2] = useState(null);

    //Affiche les articles en dropdown
    const [article, setArticle] = useState(null);

    //Affiche les categories existantes
    const [categorie, setCategorie] = useState(null);

    //Contenue de la barre de recherche
    const [search, setSearch] = useState(null);
    const navigate = useNavigate();
    const trytrytry = () => {
        // console.log(panier2);
        // console.log(cart);
    }
    // console.log(panier2);
    // console.log(cart);
// console.log(cookies.get('admin'));
    // 
    useEffect(() => {
        const token = cookies.get("user");
        if (token) {
            const decode = jwt(token);
            Read_Panier("read/cart/", decode.id, setPanier, token);
        } else {
            //add un article au localstorage
            if (typeof change === 'object' &&
                !Array.isArray(change) &&
                change !== null &&
                change.add === "add"
            ) {
                add(change);
                changeChange(0)
            }

            if (typeof change === 'object' &&
                !Array.isArray(change) &&
                change !== null &&
                change.delete === "delete"
            ) {
                // console.log(change);
                remove(change);
                changeChange(0)
            }
            // console.log(cart);
            if (cart != null) {
                setPanier2(cart);
            }
            else {
                setPanier2(JSON.parse(localStorage.getItem("cart")))
            }
        }
    }, [change, cart]);

    //Effet sur le panier2

    //Add quantity
    useEffect(() => {
        if (addQuantityPanier2 != null) {
            changeQuantity(addQuantityPanier2, 1)
            changeChange(change + 1)
            changeAddQuantityPanier2(null);
        }
    }, [addQuantityPanier2])

    //Remove quantity
    useEffect(() => {
        if (removeQuantityPanier2 != null) {
            changeQuantity(removeQuantityPanier2, -1)
            changeChange(change + 1)
            changeRemoveQuantityPanier2(null);
        }
    }, [removeQuantityPanier2])

    //Effet sur le panier2


    let Total = 0;
    let price = 0;
    let length = 0;

    if (panier) {
        for (let i = 0; i < panier.length; i++) {
            Total = Total + panier[i][0].price;
        }
    }

    if (panier2) {
        price = getTotalPrice();
        length = getNumberArticle();
    }

    const mouseOn = (e) => {
        setStyle(1);
    };

    const mouseOut = (e) => {
        setStyle(0);
    };

    const disconnect = () =>{
        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'; 
        document.cookie = 'admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'; 
        window.location.reload(false);
        // navigate("/MakeMyKeyboard/");
        
    }

    useEffect(() => {
        const show = async () => {
            if (!article) {
                await axios
                    .get(process.env.React_App_API_LINK + "articles/read")
                    .then((resp) => {
                        setArticle(resp.data);
                    });
            }
        };
        show();
    }, [article]);

    useEffect(() => {
        crudRead("read/categories", setCategorie);
    }, []);

    return (
        <div>
            {article && panier || panier2 ?
                <>
                    <div className="NavBar">

                        <Link to="/MakeMyKeyboard/" className="Navbar_Logo">
                            <img src="/imports/logotest2.png" alt="logo" className="logo"></img>
                        </Link>

                        <div className="Navbar_Link">
                            <Link to='/MakeMyKeyboard/' className="t-link" >ACCUEIL</Link>
                            <Link to='/MakeMyKeyboard/Articles' className="t-link" >ARTICLES</Link>
                            {cookies.get("user") ? 
                                    <Link to="/MakeMyKeyboard/Order" className="t-link">MES COMMANDES</Link>
                                :   
                                    <></>
                            }
                            <Link to='/MakeMyKeyboard/Explication' className="t-link" >MONTER SON CLAVIER</Link>
                        </div>

                        <div className="Navbar_Icons">
                            {cookies.get('admin') == 1 ? 
                                    <Link to='/admin/home' className="colorHover Navbar_Icons_Admin"><i className="fa-solid fa-hammer"></i></Link>
                                :   
                                    <></>
                            }

                            {cookies.get("user") ? 
                                <button onClick={disconnect} className="colorHover Navbar_Icons_Register"><i className="fa-solid fa-user-xmark"></i></button>
                                :   
                                <Link to='/register' className="colorHover Navbar_Icons_Register"><i className="fa-solid fa-user"></i></Link>
                            }

                            {panier ?
                                <Link to="/MakeMyKeyboard/Panier" className="colorHover Navbar_Icons_Panier" onMouseEnter={mouseOn} onAuxClick={mouseOut}>{panier.length}<i className="fa-solid fa-cart-shopping"></i> </Link>
                                :
                                <Link to="/MakeMyKeyboard/Panier" className="colorHover Navbar_Icons_Panier" onMouseEnter={mouseOn} onAuxClick={mouseOut}>{length}<i className="fa-solid fa-cart-shopping"></i> </Link>
                            }
                        </div>

                        <div className={style === 1 ? "Navbar_Panier_Show" : "Navbar_Panier_noShow"} onMouseEnter={mouseOn} onMouseLeave={mouseOut}>
                            <h1 className="Navbar_Panier_Title">Mon panier</h1>

                            {panier ?
                                <div className="flex">
                                    {panier.map((tab, index) =>
                                        <PanierCard key={index} article={tab[0]} panier2={panier2} />
                                    )}
                                    <div className="Navbar_Panier_Results">
                                        <p className="Navbar_Panier_Results_div">Nombre d'article : {panier.length}</p>
                                        <p className="Navbar_Panier_Results_div">Prix total : {Total} €</p>
                                    </div>
                                    <Link to="/MakeMyKeyboard/Panier" className="Navbar_Panier_Link">PANIER</Link>
                                </div>
                                :
                                <div className="flex">
                                    {panier2.map((tab, index) =>
                                        <PanierCard key={index} article={tab} panier2={panier2} />
                                    )}
                                    <div className="Navbar_Panier_Results">
                                        <p className="Navbar_Panier_Results_div">Nombre d'article : {length}</p>
                                        <p className="Navbar_Panier_Results_div">Prix total : {price} €</p>
                                    </div>
                                    <Link to="/MakeMyKeyboard/Panier" className="Navbar_Panier_Link">PANIER</Link>
                                </div>
                            }
                        </div>


                        {categorie ?
                            <form className="Navbar_SearchBar">
                                <input className="Navbar_SearchBar_Input" placeholder="Clavier en bois ...." maxLength="30" onChange={(e) => setSearch(e.target.value)} />
                                <p className="Navbar_SearchBar_Button"><i className="fa-solid fa-magnifying-glass"></i></p>
                            </form>

                            : ""
                        }



                        <div className="Navbar_dropdown">
                            {article ?
                                <div className="Navbar_dropdown_response">
                                    {article
                                        .sort((a, b) => b.viewCount - a.viewCount)
                                        .filter((article) => {
                                            if (search === null) {
                                                return null;
                                            } else if (article.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                                            ) {
                                                if (article === "" || article === null || search === null || search === "") {
                                                    return null;
                                                } else {
                                                    return article;
                                                }
                                            }
                                        })
                                        .map((article, index) => (
                                            <div key={index}>
                                                <Link to={"/MakeMyKeyboard/Articles/" + article.id} className="Navbar_dropdown_response_re">
                                                    <p>{article.name}</p>
                                                    <p> {article.price} € </p>
                                                </Link>
                                            </div>
                                        ))}
                                </div>
                                :
                                ""
                            }
                        </div>

                    </div>

                </> : null}
        </div>
    );
}

export default Navbar;