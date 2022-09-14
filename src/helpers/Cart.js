class Cart {

    constructor(){
        let cart = localStorage.getItem("cart");
        if(cart == null){
            this.cart = [];
        } else {
            this.cart = JSON.parse(cart)
        }
    }

    //Enregistre dans le local storage
    save(){
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    //Ajouter une valeur dans le local storage
    add(article) {
        let foundArticle = this.cart.find(p => p.id == article.id);
 
        if(foundArticle != undefined) {
            foundArticle.quantity++;
        } else {
            article.quantity = 1;
            this.cart.push(article);
        }
        this.save();
    }

    //supprime du cart
    remove(article){
        this.cart = this.cart.filter(p => p.id != article.id);
        this.save();
    }

    //change la quantité du cart
    changeQuantity(article, quantity) {
        let foundArticle = this.cart.find(p => p.id == article.id);
        if (foundArticle != undefined) {
            foundArticle.quantity += quantity;
            if(foundArticle.quantity <= 0) {
                this.remove(foundArticle);
            } else {
                this.save()
            }
        }
    }

    getNumberArticle(){
        let number = 0;
        for (let article of this.cart) {
            number += article.quantity;
        }
        return number;
    }

    getTotalPrice(){
        let total = 0
        for (let article of this.cart) {
            total += article.quantity * article.price;
        }
        return total;
    }
}

export default Cart;

