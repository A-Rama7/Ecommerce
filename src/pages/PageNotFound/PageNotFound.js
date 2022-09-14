import React, { useEffect, useState } from 'react';
import  { Navigate, Redirect,useNavigate } from 'react-router-dom'
import './PageNotFound.css'
import ErrorGif from './404.gif'

const PageNotFound = () => {
    const [timer, setTimer] = useState(5)

    useEffect(() => {
        setTimeout(() => {
            setTimer(timer - 1)
            // console.log(timer);
        }, 1000);
    })

        // setTimeout(() => {
            if(timer === 0){
            document.location.href="http://localhost:3000/MakeMyKeyboard/"; 
            }
        //   }, 4000);
    
    return (
        <div className='Error'>
            <img className='gifError' src={ErrorGif} />  
            <p className='ErrorTxt'>Transmissions rétablies dans</p>
            <p className='ErrorTime'>{timer} s</p>
        </div>
    );
};

export default PageNotFound;