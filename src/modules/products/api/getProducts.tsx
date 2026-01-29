import { BASE_URL } from "@store/config"
import axios from "axios"

export const getProductsByCategory = async(id:string)=>{
   try{
    const data = await axios.get(`${BASE_URL}/product/${id}`)
    return data.data.products
   }
   catch(error){
    console.log('Eror fetching getProductByCategory', error)

   }
}