import React, { FC, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '..';
import { getAllImages } from '../actions/imageActions';
import UploadForm from '../components/UploadForm';
import ImageInterface from '../interfaces/ImageInterface';
import { Col, Image, Row } from 'react-bootstrap';
import Loader from '../components/Loader';

const HomeScreen: FC<RouteComponentProps> = ({ history }) => {
    //@ts-ignore
    const { user } = useContext(AppContext);
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
                {loading ? (
                    <Loader />
                ) : (
                    images!.map((image) => (
                        <Col key={image._id} xs={10} md={4} lg={3} className='m-4'>
                            <Image src={`http://localhost:5000/api${image.url}`} rounded fluid />
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

export default HomeScreen;
