import { BASE_URL } from "@store/config"
import axios from "axios"



export const loginOrSignup = async (phone:string,address:string)=>{
    try{
        const response = await axios.post(`${BASE_URL}/user/login`,{"phone":7970686221,"address":"default address"})
        console.log(response.data.user)
        return response.data.user
    }catch(error){
        console.log(error,"error in login or signup")
        return null
    }

}
export const getOrderByUserId = async (userId:string)=>{
    try{
        const response = await axios.get(`${BASE_URL}/order/${userId}`)
        console.log(response.data.orders)
        return response.data.orders

    }catch(error){
        console.log(error,"error in get order by user id")
        return null
    }
}