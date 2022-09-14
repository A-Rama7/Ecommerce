import { useState } from 'react';
import './Admin.css';
import axios from "axios";
import crudCreate from '../../helpers/Create';

const Admin_CreateCategory = () => {

    const [category, setCategory] = useState({
        name: "une categorie"
    })
  
      const inputsHandler = (e) =>{
        let objectContent = category;
        let objectNewContent = {[e.target.name]: e.target.value}
        setCategory({...objectContent, ...objectNewContent});
      }
  
      const handleSubmit = (e) => {
          e.preventDefault();
          crudCreate("create/category", category)
      };
  
      return (
          <div className='AdminCreateCategory'>
            <h1 className='AdminCreateCategory_Title'>Create category</h1>
  
            <div className='AdminCreateCategory_form'>
                <input type="text" name='name' placeholder='name' onChange={inputsHandler}/>
            </div>
            
            <button onClick={handleSubmit}>Ajouter une categorie</button>
          </div>
      );
};

export default Admin_CreateCategory;