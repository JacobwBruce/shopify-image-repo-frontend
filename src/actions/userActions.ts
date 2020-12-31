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

export const register = async (name: string, email: string, password: string) => {
    try {
        const { data } = await axios.post(`${url}/api/users`, { name, email, password });
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
            `${url}/api/users/profile`,
            { name, email, password },
            config
        );
        localStorage.setItem('user', JSON.stringify({ ...data, token: userInfo.token }));
        return data;
    } catch (error) {
        return { error };
    }
};
