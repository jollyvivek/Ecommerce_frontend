import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CardTotal from '../components/CardTotal'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify/unstyled'

const PlaceOrder = () => {
   const {token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext)
   const [method,setMethod] = useState('cod')
   const navigate = useNavigate()
   const [formData,setFormData] = useState({
      firstName:"",lastName:"",email:"",street:"",city:"",state:"",zipcode:"",country:"",phone:""
   })

   const onChangeHandler= (e)=>{
         const {name,value} = e.target
         setFormData((data)=>({...data,[name]:value}))
   }

   const onSubmitHandler = async(e)=>{
         e.preventDefault()
         try {
            let orderItems = []
            for(const items in cartItems){
               for(const item in cartItems[items]){
                  if (cartItems[items][item] > 0) {
                     const itemInfo = structuredClone(products.find((product)=>product._id === items))
                     // console.log("itemInfo",itemInfo)
                     if (itemInfo) {
                        itemInfo.size = item
                        itemInfo.quantity= cartItems[items][item]
                        orderItems.push(itemInfo)
                     }
                  }
               }
            }
            
            let orderData = {
               address:formData,
               items:orderItems,
               amount:getCartAmount() + delivery_fee
            }
            switch(method){
               // API calls for cash on delivery order or COD
               case 'cod':
                  const response = await axios.post(backendUrl + 'api/order/place',orderData,{headers:{token}})
                  // console.log('cod response =',response)
                  if (response.data.success) {
                        navigate('/orders')
                        setCartItems({})                     
                  } else {
                     toast.error(response.data.message)
                  }
                  break;

                  default:
                  break;
            }
         } catch (error) {
            console.log(error);
            toast.error(error.message)            
         }
   }





  return (
    <form onSubmit={onSubmitHandler}  className=' flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
         <div className=' flex flex-col gap-4 w-full sm:max-w-[480px]'>
               <div className=' text-xl sm:text-2xl my-3'>
                  <Title text1={'DELIVERY'} text2={'INFORMATION'} />
               </div>
               <div className='flex gap-3'>
                  <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="text" onChange={onChangeHandler} value={formData.firstName}  name="firstName" placeholder='First name' required />
                  <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="text" onChange={onChangeHandler} value={formData.lastName} name="lastName"  placeholder='Last name' required />
               </div>
               <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="email" onChange={onChangeHandler} value={formData.email} name="email" placeholder='Email address' required />
               <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="text" onChange={onChangeHandler} value={formData.street} name="street" placeholder='Street' required />
               <div className='flex gap-3'>
                  <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="text" onChange={onChangeHandler} value={formData.city} name="city" placeholder='City' required />
                  <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="text" name="state" onChange={onChangeHandler} value={formData.state} placeholder='State' required />
               </div>
               <div className='flex gap-3'>
                  <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="text" onChange={onChangeHandler} value={formData.zipcode} name="zipcode" placeholder='Zipcode' required />
                  <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="text" onChange={onChangeHandler} value={formData.country} name="country" placeholder='Country' required />
               </div>
               <input className=' border border-gray-300 rounded py-1.5 px-3 w-full' type="number" onChange={onChangeHandler} value={formData.phone} name="phone" placeholder='Phone' required />

         </div>

         {/* right side */}
         <div className=' mt-8'>
            <div className=' mt-8 min-w-80'>
               <CardTotal/>
            </div>
            <div className='mt-12'>
               <Title text1={'PAYMENT'} text2={'METHOD'} />
               {/* Payment Method Selection */}
               <div className=' flex flex-col gap-3 lg:flex-row'>
                  <div onClick={()=>setMethod('stripe')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={` min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                        <img className=' h-5 mx-4' src={assets.stripe_logo} alt="" />
                  </div>
                  <div onClick={()=>setMethod('rozorpay')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={` min-w-3.5 h-3.5 border rounded-full ${method === 'rozorpay' ? 'bg-green-500' : ''}`}></p>
                        <img className=' h-5 mx-4' src={assets.razorpay_logo} alt="" />
                  </div>
                  <div onClick={()=>setMethod('cod')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                        <p className={` min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                        <p className=' text-gray-500 text-sm font-medium'>CASH ON DELIVERY</p>
                  </div>
               </div>
            </div>
            <div className=' w-full text-end mt-8'>
               <button type='submit' className=' bg-black text-white py-3 px-16 text-sm cursor-pointer'>PLACE ORDER</button>
            </div>
         </div>
      
      
      
   </form>
  )
}

export default PlaceOrder