import axios from 'axios';

const Poetry = axios.create({
    baseURL:'https://poetrydb.org'
})

export default Poetry