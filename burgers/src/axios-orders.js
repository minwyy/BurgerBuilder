import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-burgermate.firebaseio.com/'
});

export default instance;