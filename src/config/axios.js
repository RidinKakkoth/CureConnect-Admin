// import axios from 'axios';
// import { backendUrl } from './Api';



// const TIMEOUT_DURATION = 110000;



//   const axiosInstance = axios.create({
//         baseURL: backendUrl,
//         timeout: TIMEOUT_DURATION,
//     });

//     axiosInstance.interceptors.request.use(config => {

//         const token = localStorage.getItem('aToken');
        
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`; 
//         }
//         return config;
//     }, error => {
//         return Promise.reject(error);
//     });

//     axiosInstance.interceptors.response.use(
//         response => response,
//         error => {
//             if (error.response) {
//                 if (error.response.status === 401) {
//                     console.error('Unauthorized! Please log in again.');
//                     localStorage.removeItem('token');
//                     window.location.href = '/login'; 
//                 } else if (error.response.status === 500) {
//                     console.error('Internal Server Error!');
//                     window.location.href = '/500'; 
//                 }
//             } else {
//                 console.error('An error occurred:', error.message);
//             }
//             return Promise.reject(error);
//         }
//     );

    

//     export default axiosInstance;


import axios from 'axios';
import { backendUrl } from './Api';

const TIMEOUT_DURATION = 110000;

// Function to create Axios instance with dynamic token
const createAxiosInstance = (tokenKey) => {
    const instance = axios.create({
        baseURL: backendUrl,
        timeout: TIMEOUT_DURATION,
    });

    instance.interceptors.request.use(config => {
        const token = localStorage.getItem(tokenKey);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, error => Promise.reject(error));

    instance.interceptors.response.use(
        response => response,
        error => {
            if (error.response) {
                if (error.response.status === 401) {
                    console.error('Unauthorized! Please log in again.');
                    localStorage.removeItem(tokenKey);
                    window.location.href = '/login';
                } else if (error.response.status === 500) {
                    console.error('Internal Server Error!');
                    window.location.href = '/500';
                }
            } else {
                console.error('An error occurred:', error.message);
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

// Create separate instances for Admin and Doctor
export const adminAxiosInstance = createAxiosInstance('aToken');  // Admin API calls
export const doctorAxiosInstance = createAxiosInstance('dToken'); // Doctor API calls
