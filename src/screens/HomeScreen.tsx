import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getAllImages } from '../actions/imageActions';
import UploadForm from '../components/UploadForm';
import ImageInterface from '../interfaces/ImageInterface';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import ImageCollection from '../components/ImageCollection';

const HomeScreen: FC<RouteComponentProps> = ({ history }) => {
    const [images, setImages] = useState<null | Array<ImageInterface>>(null);
    const [loading, setLoading] = useState(true);

    const redirectToLogin = () => {
        history.push('/login');
    };

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        setLoading(true);
        //@ts-ignore
        const { data } = await getAllImages();

        //@ts-ignore
        setImages(data);
        setLoading(false);
    };

    return (
        <div>
            <UploadForm redirectToLogin={redirectToLogin} refreshImages={getImages} />
            <Row className='d-flex justify-content-center'>
                {loading ? <Loader /> : <ImageCollection images={images} />}
            </Row>
        </div>
    );
};

export default HomeScreen;
