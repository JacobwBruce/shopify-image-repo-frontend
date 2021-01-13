import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getImages } from '../actions/imageActions';
import UploadForm from '../components/UploadForm';
import ImageInterface from '../interfaces/ImageInterface';
import { Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import ImageCollection from '../components/ImageCollection';
import '../globalCSS/styles.css';

const HomeScreen: FC<RouteComponentProps> = ({ history, match }) => {
    //@ts-ignore
    const keyword = match.params.keyword;

    const [images, setImages] = useState<null | Array<ImageInterface>>(null);
    const [loading, setLoading] = useState(true);

    const redirectToLogin = () => {
        history.push('/login');
    };

    useEffect(() => {
        displayImages();
    }, [keyword]);

    const displayImages = async () => {
        setLoading(true);
        //@ts-ignore
        const { data } = await getImages(keyword);

        //@ts-ignore
        setImages(data);
        setLoading(false);
    };

    return (
        <div>
            <UploadForm redirectToLogin={redirectToLogin} refreshImages={displayImages} />
            <Row className='d-flex justify-content-center images-container'>
                {loading ? <Loader /> : <ImageCollection images={images} />}
            </Row>
        </div>
    );
};

export default HomeScreen;
