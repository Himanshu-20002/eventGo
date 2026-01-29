import axios from 'axios'

export const fetchApiData = async () => {
    const response = await axios.get('https://jsonplaceholawdawdder.typicode.com/posts')
    return response.data
}

