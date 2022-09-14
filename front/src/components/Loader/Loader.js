import React from 'react';
import LoaderGif from './loader.gif'
import './Loader.css'

const Loader = () => {
    return (
        <div className='Loader'>
            <img src={LoaderGif} />      
        </div>
    );
};

export default Loader;