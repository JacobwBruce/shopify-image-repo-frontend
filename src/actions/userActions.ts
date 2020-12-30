import axios from 'axios';

const url = 'https://shopify-image-repo.herokuapp.com';

export const login = async (email: string, password: string) => {
    try {
        const { data } = await axios.post(`${url}/api/users/login`, { email, password });
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return { error };
    }
};

export const register = async () => {
    try {
    } catch (error) {
        return error;
    }
};
