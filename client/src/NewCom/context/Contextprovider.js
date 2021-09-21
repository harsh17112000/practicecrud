import React, { createContext, useState } from 'react'

export const datacontext = createContext("");
export const dltcontext = createContext("");
export const updatecontext = createContext("");

const Contextprovider = ({ children }) => {

    const [state, setState] = useState();
    const [dlt, setDlt] = useState();
    const [update, setUpdate] = useState();

    return (
        <>
            <datacontext.Provider value={{ state, setState }}>
                <dltcontext.Provider value={{ dlt, setDlt }}>
                    <updatecontext.Provider value={{update,setUpdate}}>
                        {children}
                    </updatecontext.Provider>
                </dltcontext.Provider>
            </datacontext.Provider>
        </>
    )
}

export default Contextprovider;
