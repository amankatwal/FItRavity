import {useState, useEffect} from "react"
export const useDebounce = (value: string, duration:number)=>{
    const [debounceValue, setDebounceValue] = useState(value);
  useEffect(()=>{
        const timer =  setTimeout(()=>{setDebounceValue(value)},duration)
       return (()=> clearTimeout(timer))
   },[value])
   return debounceValue
}