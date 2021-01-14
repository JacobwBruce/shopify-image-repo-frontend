import axios from 'axios';
import { projectStorage } from '../firebase/config';
import ImageInterface from '../interfaces/ImageInterface';

const API_URL = 'https://shopify-image-repo.herokuapp.com';

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

// export const uploadImage = async (file: File) => {
//     const formData = new FormData();

//     formData.append('image', file);

//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         };

//         const { data } = await axios.post(`${API_URL}/api/uploads`, formData, config);

//         return data;
//     } catch (error) {
//         console.error(error);
//         return { error };
//     }
// };

// export const deleteUploadedImage = async (url: string) => {
//     const filename = url.split('/')[2];

//     try {
//         await axios.delete(`${API_URL}/api/uploads/${filename}`);
//     } catch (error) {
//         console.error(error);
//     }
// };

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

export const getImages = async (keyword = '') => {
    try {
        const data = await axios.get(`${API_URL}/api/images?keyword=${keyword}`);
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

export const deleteImage = (url: string) => {
    const refWithParams = url.split('/').pop();
    const ref = refWithParams?.split('?')[0];
    const imageRef = projectStorage.ref(ref);
    imageRef
        .delete()
        .then(function () {
            console.log('deleted');
            return { message: 'Image successfully delete' };
        })
        .catch(function (error) {
            console.log('NOT deleted');
            return { error, message: 'Something went wrong, please try again' };
        });
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
