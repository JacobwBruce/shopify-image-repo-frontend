import axios from 'axios';
import ImageInterface from '../interfaces/ImageInterface';

const API_URL = 'https://shopify-image-repo.herokuapp.com';
// const API_URL = 'http://localhost:5000';

const getUserToken = () => {
    const userInfo = JSON.parse(localStorage.getItem('user')!);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    return config;
};

export const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append('image', file);

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post(`${API_URL}/api/uploads`, formData, config);

        return data;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

export const deleteUploadedImage = async (url: string) => {
    const filename = url.split('/')[2];

    try {
        await axios.delete(`${API_URL}/api/uploads/${filename}`);
    } catch (error) {
        console.error(error);
    }
};

export const saveImage = async (
    token: string,
    userId: string,
    url: string,
    description: string,
    tags: Array<string>
) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(
            `${API_URL}/api/uploads/saveImage`,
            { userId, url, description, tags },
            config
        );

        return data;
    } catch (error) {
        return { error };
    }
};

export const getAllImages = async () => {
    try {
        const data = await axios.get(`${API_URL}/api/images`);
        return data;
    } catch (error) {
        return { error };
    }
};

export const getUserImages = async () => {
    try {
        const config = getUserToken();
        const data = await axios.get(`${API_URL}/api/images/user`, config);
        return data;
    } catch (error) {
        return { error };
    }
};

export const deleteImage = async (id: string) => {
    try {
        const config = getUserToken();
        const { data } = await axios.delete(`${API_URL}/api/images/${id}`, config);
        return data;
    } catch (error) {
        console.error(error);
        return { error };
    }
};

export const updateImage = async (image: ImageInterface) => {
    try {
        const config = getUserToken();
        const { data } = await axios.put(`${API_URL}/api/images/${image._id}`, image, config);
        return data;
    } catch (error) {
        console.error(error);
        return { error };
    }
};
