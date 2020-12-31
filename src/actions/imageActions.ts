import axios from 'axios';

const API_URL = 'https://shopify-image-repo.herokuapp.com';
// const API_URL = 'http://localhost:5000';

export const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append('image', file);

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await axios.post(`${API_URL}/api/upload`, formData, config);

        return data;
    } catch (error) {
        console.error(error);
        return { error };
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
            `${API_URL}/api/upload/saveImage`,
            { userId, url, description, tags },
            config
        );

        return data;
    } catch (error) {
        return { error };
    }
};
