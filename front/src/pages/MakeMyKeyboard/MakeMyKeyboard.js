import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';

import { AddQuantityPanier2Context } from '../../Context/AddQuantityPanier2';
import { ChangeContext } from '../../Context/Change';
import { RemoveQuantityPanier2Context } from '../../Context/RemoveQuantityPanier2';

const MakeMyKeyboard = () => {

    const {change, changeChange} = useContext(ChangeContext)
    const {addQuantityPanier2, changeAddQuantityPanier2} = useContext(AddQuantityPanier2Context)
    const {removeQuantityPanier2, changeRemoveQuantityPanier2} = useContext(RemoveQuantityPanier2Context)
    
    //test
    // const [addQuantityPanier2, setAddQuantityPanier2] = useState(null)
    // const [removeQuantityPanier2, setRemoveQuantityPanier2] = useState(null)


    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default MakeMyKeyboard;