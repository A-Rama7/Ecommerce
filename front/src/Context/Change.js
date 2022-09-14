import React, {createContext, useState, useMemo} from 'react';

export const ChangeContext = createContext();

export default function ChangeProvider(props){

    const [change, setChange] = useState(0)

    function changeChange(value){
        setChange(value);
    }

    const value = useMemo(() =>{
        return{
            change,
            changeChange
        }
    }, [change])

    return(
        <ChangeContext.Provider value={value}>
            {props.children}
        </ChangeContext.Provider>
    );
};