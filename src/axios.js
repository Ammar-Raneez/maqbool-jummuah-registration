import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://maqbool-reg.herokuapp.com'
})

export default instance;