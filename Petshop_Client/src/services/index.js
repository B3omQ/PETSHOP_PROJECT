import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5242/",
    withCredentials: true,
    // timeout: 1000,
});

instance.interceptors.request.use(
    function (config) {
        // if (localStorage.getItem("token")) {
        //     config.headers.Authorization = "Bearer " + localStorage.getItem("token");
        // }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {

        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url && originalRequest.url.includes('/refresh-token')) {
            return Promise.reject(error);
        }
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 

            try {
                await instance.post('/api/user/refresh-token');

            
                return instance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                localStorage.removeItem("user"); 
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;