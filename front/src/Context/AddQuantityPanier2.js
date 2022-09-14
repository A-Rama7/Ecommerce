import React, {createContext, useState, useMemo} from 'react';

export const AddQuantityPanier2Context = createContext();

export default function AddQuantityPanier2Provider(props){

    const [addQuantityPanier2, setAddQuantityPanier2] = useState(null)

    function changeAddQuantityPanier2(value){
        setAddQuantityPanier2(value);
    }

    const value = useMemo(() =>{
        return{
            addQuantityPanier2,
            changeAddQuantityPanier2
        }
    }, [addQuantityPanier2])

    return(
        <AddQuantityPanier2Context.Provider value={value}>
            {props.children}
        </AddQuantityPanier2Context.Provider>
    );
};