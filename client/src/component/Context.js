import { createContext , useState , useEffect, Children } from "react";


export const TodoContext = createContext();

export const TodoProvider = ({children})=>{
    const [alltodos , setAlltodos] = useState([]);
    const [inputvalue , setInputvalue]=useState("");
    
    return(
    <TodoContext.Provider value={
        {alltodos,
        setAlltodos,
        inputvalue,
        setInputvalue
        }}>
        {children}
    </TodoContext.Provider>
    );
}