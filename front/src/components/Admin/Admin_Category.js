import './Admin.css';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Admin_CategoryCard from './Admin_CategoryCard';
import crudRead from '../../helpers/Read';

const Admin_Category = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        crudRead("read/categories", setData)
    }, []);

    return (
        <div className='Admin_Category'>
            <div className='Admin_Category_Create'>
                <Link to="/Admin/CreateCategory">Creer une categorie</Link>
            </div>
                
            {data ?      
                <div className="AdminCategory_Call_Cards">
                {data.map(tab =>
                    <Admin_CategoryCard key={tab.id} article={tab} />
                )} 
                </div>

                : "PAS D'ARTICLE ou PROBLEME src:Article_list.js" }
        </div>
    );
};

export default Admin_Category;