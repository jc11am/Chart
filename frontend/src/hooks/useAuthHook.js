import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuthHook = function(){
    const AuthValue = useContext(AuthContext)

    if(!AuthValue){
        throw Error("useAuthHook must be used inside an AuthContextProvider")
    }

    return AuthValue
}