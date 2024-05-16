import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


interface PrivateProps{
    children: ReactNode
}



export function Private({children}: PrivateProps): any{

    //controle

    const [loading, setLoading ] = useState(true)
    const [signed, setSigned] = useState(false);

    useEffect(()=>{

        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){

                localStorage.setItem('@reactlinks', JSON.stringify(user))

                setLoading(false);
                setSigned(true);

            }else{
                setLoading(false)
                setSigned(false)
            }
        })

        return () =>{
            unsub();
        }

    },[])

    if(loading ){
        return <div></div>
    }

    if(!signed){
        return <Navigate to='/login'/>
    }

    return children;
}