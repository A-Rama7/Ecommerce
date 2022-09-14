import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, Pagination, Navigation } from "swiper";
const Carrousel = ( {article} ) => {
    return (
        <SwiperSlide>
            <Link to={`/Articles/${article.id}`}>
                <img alt={article.name} src={article.image}></img>
            </Link>
        </SwiperSlide>
    );
};

export default Carrousel;