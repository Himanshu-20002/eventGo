import { BASE_URL } from "@store/config"
import axios from "axios"


export const fetchCategoriesData =async()=>{
    console.log("api cld")
    const data = await axios.get(`${BASE_URL}/category`);
    return data.data?.categories

}