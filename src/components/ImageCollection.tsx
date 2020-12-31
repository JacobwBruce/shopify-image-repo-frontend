import React, { FC } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import ImageInterface from '../interfaces/ImageInterface';

interface Props {
    images: Array<ImageInterface> | null;
}

const ImageCollection: FC<Props> = ({ images }) => {
    return (
        <Row className='d-flex justify-content-center'>
            {images!.map((image) => (
                <Col key={image._id} xs={10} md={4} lg={3} className='m-4'>
                    <Image src={`http://localhost:5000/api${image.url}`} rounded fluid />
                </Col>
            ))}
        </Row>
    );
};

export default ImageCollection;
