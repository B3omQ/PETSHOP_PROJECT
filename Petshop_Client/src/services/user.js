import instance from ".";
import { endpoint } from "./endpoints";

export const login = async (value) => {
        const res = await instance.post(endpoint.USERS + '/login', {
            email: value.email,
            password: value.password
        });
        return res.data;
}

export const signUp = async (value) => {
    try {
        const response = await instance.post(endpoint.USERS + '/signup', {
            FullName: value.FullName,
            Email: value.Email,
            Password: value.Password
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.data;
    }
}

export const logout = async () => {
        return await instance.post(endpoint.USERS + '/logout');
}