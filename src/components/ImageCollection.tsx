import React, { FC } from 'react';
import { useState } from 'react';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ImageInterface from '../interfaces/ImageInterface';
import './css/ImageCollection.css';

interface Props {
    images: Array<ImageInterface> | null;
    profileScreen?: boolean;
    deleteImageHandler?: Function;
}

const ImageCollection: FC<Props> = ({ images, profileScreen, deleteImageHandler }) => {
    const [selectedId, setSelectedId] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (id: string) => {
        setSelectedId(id);
        setDeleteModal(true);
    };

    return (
        <Row className='d-flex justify-content-center'>
            {images!.map((image) => (
                <Col
                    key={image._id}
                    xs={10}
                    md={4}
                    lg={3}
                    className='m-4 position-relative image-container'
                >
                    <Image
                        className={profileScreen ? 'profile-images' : 'home-screen-images'}
                        src={`https://shopify-image-repo.herokuapp.com/api${image.url}`}
                        rounded
                        fluid
                    />
                    {profileScreen && (
                        <div className='position-absolute button-container'>
                            <Button variant='warning'>Edit</Button>
                            <Button variant='danger' onClick={() => openDeleteModal(image._id)}>
                                Delete
                            </Button>
                        </div>
                    )}
                </Col>
            ))}
            {profileScreen && (
                <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
                    <ModalHeader closeButton>
                        Are you sure you want to delete this image?
                    </ModalHeader>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => setDeleteModal(false)}>
                            Close
                        </Button>
                        <Button variant='danger' onClick={() => deleteImageHandler!(selectedId)}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Row>
    );
};

ImageCollection.defaultProps = {
    profileScreen: false,
};

export default ImageCollection;
