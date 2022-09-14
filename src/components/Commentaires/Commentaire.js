import React from 'react';
import './Commentaire.css'

const Commentaire = ( {Commentaire} ) => {
    return (
        <div className='Comment'>

            <p className='Comment_Name'> {Commentaire.username} </p>
            <p className='Comment_text'>A poster : {Commentaire.comment}</p>

        </div>
    );
};

export default Commentaire;