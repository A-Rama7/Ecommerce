import './Admin.css';
import React, { useState, useEffect } from 'react';
import Admin_ArticleCard from './Admin_ArticleCard';
import crudRead from '../../helpers/Read';

const AdminShowArticle = () => {

    const [data, setData] = useState(null);

    useEffect(() => {
        crudRead("articles/read", setData);
    }, []);

    return (
        <div className='AdminShowArticle'>
            <h1>show articles</h1>
                
            {data ?      
                <div className="AdminShowArticle_Cards">
                <div className='AdminShowArticle_Cards_Details'>
                    <p className='AdminShowArticle_Cards_Details_name'>name</p>
                    <p className='AdminShowArticle_Cards_Details_description'>description</p>
                    <p className='AdminShowArticle_Cards_Details_price'>prix</p>
                    <p className='AdminShowArticle_Cards_Details_feature'>feature</p>
                    <p className='AdminShowArticle_Cards_Details_image'>image</p>
                    <p className='AdminShowArticle_Cards_Details_quantity little_font'>quantity</p>
                    <p className='AdminShowArticle_Cards_Details_category_id little_font'>category</p>
                    <p className='AdminShowArticle_Cards_Details_viewcount little_font'>view count</p>
                    <p className='AdminShowArticle_Cards_Details_recommendation little_font'>recommendation</p>
                    <p className='AdminShowArticle_Cards_Details_reduction little_font'>Reduction</p>

                    <div className='AdminShowArticle_ArticleCard_Options'>

                    </div>
                </div>

                {data.map(tab =>
                    <Admin_ArticleCard key={tab.id} article={tab} />
                )} 
                </div>

                : "PAS D'ARTICLE ou PROBLEME src:Adminshowarticle.js" }
        </div>
    );
};

export default AdminShowArticle;