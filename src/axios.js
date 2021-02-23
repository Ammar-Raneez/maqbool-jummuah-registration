import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://maqbool-registration-database.herokuapp.com'
})

export default instance;