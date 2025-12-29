import instance from ".";
import { endpoint } from "./endpoints";

export const getAllProducts = async () => {
    try {
        const res = await instance.get(endpoint.PRODUCTS);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};