import React from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';

const Admin_Navbar = () => {
    return (
    <div className='Admin_Navbar'>

        <div className='Admin_Navbar_Item'>
            <Link to='/Admin/Home' className='font-white'>Admin Home</Link>
        </div>

        <div className='Admin_Navbar_Item'>
            <Link to='/Admin/ShowArticle' className='font-white'>Afficher les articles</Link>
        </div>

        <div className='Admin_Navbar_Item'>
            <Link to='/Admin/CreateArticle' className='font-white'>Creation d'article</Link>
        </div>

        <div className='Admin_Navbar_Item'>
            <Link to='/Admin/Category' className='font-white'>Categorie</Link>
        </div>

        <div className='Admin_Navbar_Item'>
            <Link to='/Admin/CreateCategory' className='font-white'>Creation d'une Categorie</Link>
        </div>

        <div className='Admin_Navbar_Home'>
            <Link to='/MakeMyKeyboard/' className='font-white'>Home</Link>
        </div>
    </div>
    );
};

export default Admin_Navbar;