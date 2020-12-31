import axios from 'axios';

// const API_URL = 'https://shopify-image-repo.herokuapp.com';
const API_URL = 'http://localhost:5000';

export const login = async (email: string, password: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users/login`, { email, password });
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return { error };
    }
};

export const register = async (name: string, email: string, password: string) => {
    try {
        const { data } = await axios.post(`${API_URL}/api/users`, { name, email, password });
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return { error };
    }
};

export const updateProfile = async (name: string, email: string, password: string) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('user')!);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `${API_URL}/api/users/profile`,
            { name, email, password },
            config
        );
        localStorage.setItem('user', JSON.stringify({ ...data, token: userInfo.token }));
        return data;
    } catch (error) {
        return { error };
    }
};
