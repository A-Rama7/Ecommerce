import React, { useState, useEffect } from 'react';
import ArticleCard from "../../components/Article/ArticleCard";
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import crudRead from '../../helpers/Read';
import './Article_list.css'

const Article = () => {

    const [article, setArticle] = useState(null);
    const [search, setSearch] = useState(null);
    const [abc, setAbc] = useState(null);


    useEffect(() => {
        crudRead("articles/read", setArticle);
    }, []);

    return (
        <div>
            <div className='Article_list_background'>
                <img src="/imports/fondkey.png" alt="" />
                <div className='Article_list_background_txt'>
                    <p className='Article_list_background_txt_1'>NOS PRODUITS</p>
                    <p className='Article_list_background_txt_2'>Clavier mechanique, switch...</p>
                    <p className='Article_list_background_txt_3'>La marque MakeMyKeyboard vous propose le meilleur</p>
                </div>
            </div>
            <div className='Article_list_def'>
                <div className='Article_list_def_nav'>
                    <input placeholder='Touche en bois ....' className='inp-art' onChange={(e) => setSearch(e.target.value)}></input>
                </div>
                <h1>TOUS NOS PRODUITS</h1>
            </div>
            {article ?
                <div className="Article_list_CallCards">
                    {article
                        .sort((a, b) => b.viewCount - a.viewCount)
                        // afficher les 10 premiers articles
                        .filter((article) => {
                            if (search === null) {
                                return article;
                            } else if (article.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || article.categoryId === abc
                            ) {
                                return article;
                            }
                        })

                        .map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                </div>
                :
                <Loader />
            }
        </div>
    );
};

export default Article;