import instance from ".";
import { endpoint } from "./endpoints";

export const getAllCategories = async () => {
    try {
        const res = await instance.get(endpoint.CATEGORIES);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};