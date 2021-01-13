import React, { FC, useState } from 'react';
import { Row, Col, Image, Modal, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getUserByID } from '../actions/userActions';
import ImageInterface from '../interfaces/ImageInterface';
import '../globalCSS/styles.css';

interface Props extends RouteComponentProps {
    images: Array<ImageInterface> | null;
}

const ImageCollection: FC<Props> = ({ images, history }) => {
    const [selectedImage, setSelectedImage] = useState<ImageInterface | null>(null);
    const [modalVisable, setModalVisable] = useState(false);
    const [name, setName] = useState('');

    const searchByTag = (tag: string) => {
        history.push(`/search/${tag}`);
    };

    const openModal = async (image: ImageInterface) => {
        const user = await getUserByID(image.user!);
        setName(user.name);
        setSelectedImage(image);
        setModalVisable(true);
    };

    return (
        <Row className='d-flex justify-content-center images-container'>
            {images!.map((image) => (
                <Col key={image._id} xs={10} md={4} lg={3} className='m-4'>
                    <Image
                        src={`https://shopify-image-repo.herokuapp.com/api${image.url}`}
                        alt='Trouble loading image!'
                        rounded
                        fluid
                        onClick={() => openModal(image)}
                        style={{ cursor: 'pointer' }}
                    />
                </Col>
            ))}
            <Modal show={modalVisable} onHide={() => setModalVisable(false)}>
                <Modal.Header closeButton>{name}'s image</Modal.Header>
                <Modal.Body>
                    <Image
                        src={`https://shopify-image-repo.herokuapp.com/api${selectedImage?.url}`}
                        rounded
                        fluid
                        alt='Trouble loading image!'
                    />
                    <h4 className='my-3'>{selectedImage?.description}</h4>
                    {selectedImage?.tags.map((tag: string) => (
                        <span key={tag} className='m-2'>
                            <Button
                                variant='success'
                                onClick={() => searchByTag(tag)}
                                style={{ marginBottom: '.5rem' }}
                            >
                                {tag}
                            </Button>
                        </span>
                    ))}
                </Modal.Body>
            </Modal>
        </Row>
    );
};

export default withRouter(ImageCollection);
