import React, { useState } from 'react';
import './ArticleCards.css';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const [hover, setHover] = useState(false)

    const toggle = () => setHover(o => !o)
    // console.log(article);
    // console.log(article);
    return (
        <div className={article.reduction != null ? "ArticleCard Promotion" : "ArticleCard"} onMouseEnter={toggle} onMouseLeave={toggle}>
                <div className={article.recommendation ? "ArticleCard_Recommendation" : "displayNone"}>
                    <h1>#Recommandé par MakeMyKeyboard  </h1>
                </div>

                <div className={article.reduction ? "ArticleCard_Promotion" : "displayNone"}>
                    <h1>#Promotion  </h1>
                </div>
                
                <div className="ArticleCard_Image">
                    <img src={article.image} alt="" />
                </div>

                <div className="ArticleCard_Footer">
                    <h1>{article.name}</h1>
                    {article.reduction != null ?
                        <p className='ArticleCard_Footer_Price Promotion'> <s>{article.price}</s> -{article.reduction}% = {article.price - (article.price * article.reduction / 100)}€</p>
                        :
                        <p className='ArticleCard_Footer_Price'>{article.price}€</p>}
                </div>

                <div className= {hover === false ? 'ArticleCard_More displayNone' : 'ArticleCard_More'} >
                    <div className='ArticleCard_More_Describe'>
                        <p> {article.description} </p>
                        {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio consequatur rem, porro magni autem corporis quaerat natus excepturi, quidem quibusdam ea minus rerum saepe praesentium voluptas delectus velit, laboriosam nostrum explicabo eius commodi vitae aspernatur obcaecati. Cupiditate eveniet recusandae inventore repellat modi debitis, ratione, voluptatum sunt, aspernatur id distinctio magni.</p> */}
                        <div className='ArticleCard_More_Describe_effect'></div>
                </div>
                    <Link to={`/MakeMyKeyboard/Articles/${article.id}`} className="ArticleCard_More_Describe_ViewMore">View more</Link>
        
                </div>
        </div>
    );
};

export default ArticleCard;