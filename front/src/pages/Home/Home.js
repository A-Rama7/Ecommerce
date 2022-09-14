import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Scrollbar, Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import crudRead from "../../helpers/Read";
import Navbar from "../../components/Navbar/Navbar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./home.css";
import ArticleCard from "../../components/Article/ArticleCard";
import Loader from "../../components/Loader/Loader";

const Home = () => {

    const [panier, setPanier] = useState(null);
    const [article, setArticle] = useState(null);
    const [categorie, setCategorie] = useState(null);
    const [search, setSearch] = useState(null);

    const [abc, setAbc] = useState(null);
    const [CatId, setCatId] = useState(null);

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

    useEffect(() => {
        setAbc(CatId)
    }, [CatId, abc])

    return (
        <div>

            {article ?
                <>
                    {/* <Navbar article={panier} /> */}

                    <Swiper
                        slidesPerView={2}
                        spaceBetween={40}
                        loop={true}
                        centeredSlides={true}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {article ?
                            <div>
                                {article
                                    .slice(0, 5)
                                    .map((tab, index) =>
                                        <SwiperSlide key={index}>
                                            <Link to={`/MakeMyKeyboard/Articles/${tab.id}`}>
                                                <img alt={tab.name} src={tab.image}></img>
                                            </Link>
                                        </SwiperSlide>
                                        // <Carrousel article={tab}/>
                                    )}
                            </div>
                            :
                            ""
                        }
                    </Swiper>

                    <div className="Home">
                        <h1 className='Tilte_Cat'>Catégories</h1>

                        {categorie ?
                            <>
                                <Swiper
                                    slidesPerView={4}
                                    centeredSlides={true}
                                    loop={true}
                                    navigation={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Scrollbar, Navigation]}
                                    className="mySwipe"
                                >
                                    <div>
                                        {categorie.map((tab, index) =>
                                            <SwiperSlide key={index}>
                                                <Link to={`/MakeMyKeyboard/Category/${tab.id}`}>
                                                    <div className='cat-cards'>
                                                        <img className='cat_img' src={tab.image}></img>
                                                        <p className='cat-txt'> {tab.name} </p>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )}
                                    </div>
                                </Swiper>
                            </>
                            :
                            ""
                        }
                    </div>

                    <h1 className='Tilte_Pop'>Cela peut vous intéresser</h1>
                    {article ? (
                        <div>
                            <input placeholder='Touche en bois ....' className='Pop-inp' onChange={(e) => setSearch(e.target.value)}></input>
                            <div className="flexAccueil">
                                {article
                                    .sort((a, b) => b.viewCount - a.viewCount)
                                    // afficher les 10 premiers articles
                                    .slice(0, 9)
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
                        </div>
                    ) :
                        ""
                    }
                </>
                :
                <Loader />
            }
        </div >
    );

}

export default Home;