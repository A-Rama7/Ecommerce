import React, {createContext, useState, useMemo} from 'react';

export const RemoveQuantityPanier2Context = createContext();

export default function RemoveQuantityPanier2Provider(props){

    const [removeQuantityPanier2, setRemoveQuantityPanier2] = useState(null)

    function changeRemoveQuantityPanier2(value){
        setRemoveQuantityPanier2(value);
    }

    const value = useMemo(() =>{
        return{
            removeQuantityPanier2,
            changeRemoveQuantityPanier2
        }
    }, [removeQuantityPanier2])

    return(
        <RemoveQuantityPanier2Context.Provider value={value}>
            {props.children}
        </RemoveQuantityPanier2Context.Provider>
    );
};