import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import crudUpdate from '../../helpers/Update';
import crudDelete from '../../helpers/Delete';

const Admin_CategoryCard = ({article}) => {

    const [update, setUpdate] = useState({
      name: article.name
    })

    const updateElement = (e) => {
      let objectContent = update;
      let objectNewContent = {[e.target.name]: e.target.value}
      setUpdate({...objectContent, ...objectNewContent});
    }

    const deleteElement = () => {        
      crudDelete("delete/category", article.id)
    };

    const sendUpdate = () => {
      crudUpdate("update/category", article.id, update)
    }

    return (
        <div className='Admin_CategoryCard'>
          <input type="text" name='name' className='Admin_CategoryCard_input' placeholder={"name : " + article.name} onChange={updateElement}/>

          <div className='Admin_CategoryCard_Options'>
            <button className='Admin_CategoryCard_Options_Modifier' onClick={sendUpdate}>Modifier</button>
            <button className='Admin_CategoryCard_Options_Supprimer' onClick={deleteElement}>Supprimer</button>
          </div>
                
        </div>
    );
};

export default Admin_CategoryCard;