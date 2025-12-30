import instance from ".";
import { endpoint } from "./endpoints";

export const login = async (value) => {
    try {
        const res = await instance.post(endpoint.USERS , {
            email : value.email , 
            password : value.password
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}