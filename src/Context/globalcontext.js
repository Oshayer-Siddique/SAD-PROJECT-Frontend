import React, { Children, useContext, useState } from "react"
import axios from 'axios'

const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {

    const[income,setIncome]= useState([])
    const[expenses,setExpenses] = useState([])
    const[error, setError] = useState(null)
    
    
    const addIncome = async(income) => {
        const response = await axios.post('http://localhost:5000/tracking/crtincome',income)
        .catch((err)=> {
            setError(err.response.data.message)
        })
    } 


    return(
        <GlobalContext.Provider value={{
            addIncome,
             
        }}>
            {children}
        </GlobalContext.Provider>

    )
}


export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}


