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

export const getAllProductsByName = async (name) => {
    try {
        const res = await instance.get(endpoint.PRODUCTS + 'search', {
            params: { name }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const res = await instance.get(endpoint.PRODUCTS + `${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

