import axios from 'axios'
import  {createContext, useState, useEffect} from 'react'

export const UserContext = createContext({})

export const UserContextProvider = ({children}) =>{
    const [user, setUser] =  useState(null)
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
          axios.get("/users/profile", {withCredentials: true}).then((data)=>{
            setUser(data.data.user)
            setReady(true)
          }).catch(err => console.log(err))
          
        }
      }, [user]);
    
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    );
}