import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Admin.css";
import crudUpdate from '../../helpers/Update';
import crudDelete from '../../helpers/Delete';

const Admin_ArticleCard = ({article}) => {

  // console.log(article);

    const [update, setUpdate] = useState({
        name: article.name,
        price: article.price,
        description: article.description,
        feature: article.feature,
        image: article.image,
        view_count: article.viewCount,
        quantity: article.quantity,
        category_id: article.categoryId,
        recommendation: article.recommendation,
        reduction: article.reduction
    })

    const updateElement = (e) => {
      let objectContent = update;
      let name = {[e.target.name]: e.target.value}
      // console.log(objectContent);
      // console.log(name);
      setUpdate({...objectContent, ...name});
      // console.log(update);

    }

    const deleteElement = () => {
        crudDelete("articles/delete",article.id)
    };

    const sendUpdate = () => {
        crudUpdate("articles/update", article.id, update)
    }







// -----------------------BOUTON STOCK--------------------
const [stck, setStck] = useState();
    useEffect(()=>{
      if (article.quantity === 0) {
        setStck (0);
      }
      else if (article.quantity > 0) {
        setStck (1);
      }
    }, [])

    const Stock = (e) => {
      if (article.quantity > 0) {
        axios
        .post(
          process.env.React_App_API_LINK + `articles/NoQuantity/${article.id}`,
          {
            quantity: article.quantity
          }
        )
        .then((res) => 
          article.quantity = res.data.quantity,
        //   setStck("Stock Stock_no")
        )
        .catch((err) => {
          console.log(err);
        });
      }
      else if (article.quantity === 0){
        axios
        .post(
          process.env.React_App_API_LINK + `articles/PlusQuantity/${article.id}`,
          {
            quantity: article.quantity
          }
        )
        .then((res) => 
          article.quantity = res.data.quantity,
        //   setStck("Stock")
        )
        .catch((err) => {
          console.log(err);
        });
      }

      window.location.reload()
    }

    return (
        <div className='Admin_ArticleCard'>
                <input type="text" name='name' className='Admin_ArticleCard_Name' placeholder={article.name} onChange={updateElement}/>
                <input type="text" name='description' className='Admin_ArticleCard_Description' placeholder={article.description} onChange={updateElement}/>
                <input type="text" name='price' className='Admin_ArticleCard_Price' placeholder={article.price} onChange={updateElement}/>
                <input type="text" name='feature' className='Admin_ArticleCard_Feature' placeholder={article.feature} onChange={updateElement}/>
                <input type="text" name='image' className='Admin_ArticleCard_Image' placeholder={article.image} onChange={updateElement}/>
                <input type="text" name='quantity' className= {article.quantity < 1 ? 'Admin_ArticleCard_Quantity_zero' : article.quantity > 10 ? 'Admin_ArticleCard_Quantity_noSell' : 'Admin_ArticleCard_Quantity'}  placeholder={article.quantity} onChange={updateElement}/>
                <input type="text" name='category_id' className='Admin_ArticleCard_category_id' placeholder={article.categoryId} onChange={updateElement}/>
                <input type="text" name='view_count' className='Admin_ArticleCard_view_count' placeholder={article.viewCount} onChange={updateElement}/>
                <input type="text" name='recommendation' className='Admin_ArticleCard_recommendation' placeholder={article.recommendation} onChange={updateElement}/>
                <input type="text" name='reduction' className='Admin_ArticleCard_recommendation' placeholder={article.reduction} onChange={updateElement}/>

                <div className='Admin_ArticleCard_Options'>
                    <button className='Modifier' onClick={sendUpdate}>Modifier</button>
                    <button className= {stck === 0 ? "Stock_no" : "Stock"} onClick={Stock}>Stock</button>
                    <button className='Supprimer' onClick={deleteElement}>Supprimer</button>
                </div>
                
        </div>
    );
};

export default Admin_ArticleCard;