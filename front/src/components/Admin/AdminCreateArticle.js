import { useState } from 'react';
import './Admin.css';
import crudCreate from '../../helpers/Create';

const AdminCreateArticle = () => {

    const [article, setArticle] = useState({
      name: "create",
      price: "0",
      description: "create",
      feature: "null",
      image: "create",
      view_count: "0",
      category_id: "0",
      quantity: "0",
      recommendation: "0",
      street: "null",
      city: "null",
      state: "null",
      zip: "0",
      phone: "0",
      length: "0",
      width: "0",
      height: "0",
      weight: "0",
      new_release: "null",
      reduction: "0"
    })

    const inputsHandler = (e) =>{
        let objectContent = article;
        let objectNewContent = {[e.target.name]: e.target.value}
        setArticle({...objectContent, ...objectNewContent});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        crudCreate("articles/create", article)
    };

    return (
        <div className='AdminCreateArticle'>
            <h1 className='AdminCreateArticle_Title'>Create article</h1>

            <div className='AdminCreateArticle_form'>
                <input type="text" name='name' placeholder='name' onChange={inputsHandler}/>
                <input type="text" name='description' placeholder='description' onChange={inputsHandler}/>
                <input type="text" name='feature' placeholder='feature' onChange={inputsHandler}/>
                <input type="text" name='price' placeholder='price' onChange={inputsHandler}/>
                <input type="text" name='image' placeholder='image' onChange={inputsHandler}/>
                <input type="text" name='quantity' placeholder='quantity' onChange={inputsHandler}/>
                <input type="text" name='category_id' placeholder='category_id' onChange={inputsHandler}/>
                <input type="text" name='view_count' placeholder='view_count' onChange={inputsHandler}/>
                <input type="text" name='recommendation' placeholder='recommendation' onChange={inputsHandler}/>

                <input type="text" name='street' placeholder='street' onChange={inputsHandler}/>
                <input type="text" name='city' placeholder='city' onChange={inputsHandler}/>
                <input type="text" name='state' placeholder='state' onChange={inputsHandler}/>
                <input type="text" name='zip' placeholder='zip' onChange={inputsHandler}/>
                <input type="text" name='phone' placeholder='phone' onChange={inputsHandler}/>
                <input type="text" name='length' placeholder='length' onChange={inputsHandler}/>
                <input type="text" name='width' placeholder='width' onChange={inputsHandler}/>
                <input type="text" name='height' placeholder='height' onChange={inputsHandler}/>
                <input type="text" name='weight' placeholder='weight' onChange={inputsHandler}/>
                <input type="text" name='new_release' placeholder='new_release' onChange={inputsHandler}/>
                <input type="text" name='reduction' placeholder='reduction' onChange={inputsHandler}/>
            </div>
            
            <button onClick={handleSubmit}>Send</button>

        </div>
    );
};

export default AdminCreateArticle;