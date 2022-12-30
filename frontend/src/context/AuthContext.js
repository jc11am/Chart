import { createContext, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{
    const history = useHistory()
    const [ user, setUser ] = useState( )
    useEffect(function(){
        const token = JSON.parse(localStorage.getItem("userInfo"))
        if(!token){
            history.push("/chat");
        }
    }, [history])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthUser = function(){
    return useContext(AuthContext);
}