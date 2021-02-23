import axios from 'axios'

const instance = axios.create({
    baseURL: 'maqbool-reg-backend.firebaseapp.com'
    // baseURL: 'http://localhost:9000'
})

export default instance;