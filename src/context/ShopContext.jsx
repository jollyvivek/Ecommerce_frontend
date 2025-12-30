import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { backendUrl } from "../App";


export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
  
  const currency = "$";
  const delivery_fee =10;
  // const backendUrl= import.meta.env.VITE_BACKEND_URL
  const [search,setSearch] = useState('')
  const [showSearch,setShowSearch] = useState(false)
  const [cartItems,setCartItems] = useState({})
  const [products,setProducts] = useState([])
  const [token,setToken] = useState("")
 
// console.log(backendUrl)

  const addToCart = async(itemId,size)=>{
    if(!size){
        toast.error("Please Select Product Size ! ")
        return;
    }
     let cartData = structuredClone(cartItems);
     if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size] += 1;

        }else{
          cartData[itemId][size] = 1;
        }
     }else{
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
     }
     setCartItems(cartData)
  }

  const getCartCount = () =>{
    let totalCount = 0;
    for(const items in cartItems){
      for(const item in cartItems[items]){
        try {
            if (cartItems[items][item] > 0) {
              totalCount += cartItems[items][item] 
            }
        } catch (error) {
          
        }
      }
    }
    return totalCount ;
  }

  const getCartAmount =()=>{
      let totalAmount = 0;
      for(const items in cartItems){
          let itemInfo = products.find((product)=> product._id === items);
          for (const item in cartItems[items]){
              try {
                  if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item]
                  }
              } catch (error) {
                
              }
          }
      }
      return totalAmount ;
  }

  const updateQuantity = async(itemId,size,quantity)=>{
      let cartData = structuredClone(cartItems)
      cartData[itemId][size] = quantity;
      setCartItems(cartData)
  }

  // useEffect(()=>{ console.log(cartItems)},[cartItems])

  const getProductsData = async()=>{
      try {
          const response = await axios.get(backendUrl +"api/product/list")
          if (response.data.success) {
           setProducts(response.data.data) 
          }else{
            console.log(response.data.message)
          }
          
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{
    getProductsData()},[])

  // useEffect(()=>{
  //   if(!token && localStorage.getItem("token")){
  //       setToken(localStorage.getItem("token"))
  //   }
  // },[token])
  

  const value = {
      products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,cartItems,setCartItems,cartItems,addToCart,
      getCartCount,updateQuantity,getCartAmount,backendUrl,token,setToken
  }



  return(
    <ShopContext.Provider value={value}>
    {props.children}
  </ShopContext.Provider>
  )

}

export default ShopContextProvider