import React, {createContext, useState, useMemo, useEffect} from 'react';

export const CartContext = createContext();

export default function CartProvider(props){

    const [cart, setCart] = useState(null)  
    const [test, setTest] = useState(0);

    useEffect(()=> {
        // console.log(cart);
        if(localStorage.getItem("cart")){
            setCart(JSON.parse(localStorage.getItem("cart")))
            // console.log('vtf');
        } 
        else{
            // console.log('t une merde');
            setCart([]);
        } 

        if(test > 0){
            // console.log("okcapart");
            // console.log(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart(JSON.parse(localStorage.getItem("cart")))
            // console.log('lourd');
            setTest(0)
            // console.log(test);
        }
    },[test])

    // console.log(cart);
    function changeCart(value){
        setCart(value)
    }
    function trytry(){
        // console.log(cart);
    }

    //Enregistre dans le local storage
    function save(){
        localStorage.setItem("cart", JSON.stringify(cart));
        setTest(test +1)
        // console.log(test);
    }

    //Ajouter une valeur dans le local storage
    function add(article) {
        let foundArticle = cart.find(p => p.id == article.id);
    
        if(foundArticle != undefined) {
            foundArticle.quantity++;
        } else {
            article.quantity = 1;
            cart.push(article);
        }
        save();
    }

    //supprime du cart
    function remove(article){
        // setCart(cart.filter(p => p.id != article.id));
        let test = cart.filter(p => p.id != article.id)
        // console.log(cart);
        // console.log(test);
        setCart(test);

        // console.log(article);
        // if(article.id)
        save();
    }

    //change la quantité du cart
    function changeQuantity(article, quantity) {
        let foundArticle = cart.find(p => p.id == article.id);
        if (foundArticle != undefined) {
            foundArticle.quantity += quantity;
            if(foundArticle.quantity <= 0) {
                remove(foundArticle);
            } else {
                save()
            }
        }
    }

    function getNumberArticle(){
        let number = 0;
        for (let article of cart) {
            number += article.quantity;
        }
        return number;
    }

    function getTotalPrice(){
        let total = 0
        for (let article of cart) {
            total += article.quantity * article.price;
        }
        // console.log(total);
        return total;
    }
    

    const value = useMemo(() =>{
        return{
            cart,
            save,
            add,
            remove,
            changeQuantity,
            getNumberArticle,
            getTotalPrice,
            trytry,
            changeCart
        }
    }, [cart])

    return(
        <CartContext.Provider value={value}>
            {props.children}
        </CartContext.Provider>
    );
};