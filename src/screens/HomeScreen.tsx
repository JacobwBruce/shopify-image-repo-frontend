import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getImages } from '../actions/imageActions';
import UploadForm from '../components/UploadForm';
import ImageInterface from '../interfaces/ImageInterface';
import { Row } from 'react-bootstrap';
import ImageCollection from '../components/ImageCollection';
import '../globalCSS/styles.css';
import Message from '../components/Message';
import SquareLoader from '../components/SquareLoader';

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
            {!keyword && (
                <UploadForm redirectToLogin={redirectToLogin} refreshImages={displayImages} />
            )}
            {images?.length === 0 ? (
                <div className='container'>
                    <Message variant='info my-4'>No Images Found! 😔</Message>
                </div>
            ) : (
                <Row className='d-flex justify-content-center images-container'>
                    {loading ? <SquareLoader /> : <ImageCollection images={images} />}
                </Row>
            )}
        </div>
    );
};

export default HomeScreen;
