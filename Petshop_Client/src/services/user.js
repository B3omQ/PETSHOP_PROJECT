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
            FullName: value.fullname,
            Email: value.email,
            Password: value.password,
            ConfirmPassword: value.confirmpassword,
            Phone: value.phone,
            Address: value.address
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }

}

export const logout = async () => {
    return await instance.post(endpoint.USERS + '/logout');
}

export const forgotPassword = async (value) => {
    try {
        const response = await instance.post(endpoint.USERS + '/forgot-password', {
            Email: value.email,
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }

}