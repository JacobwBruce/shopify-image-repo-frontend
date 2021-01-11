import React, { FC } from 'react';
import { useState } from 'react';
import { Row, Col, Image, Button, Modal, Form, ModalBody, ModalFooter } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import ImageInterface from '../interfaces/ImageInterface';
import './css/ProfileImageCollection.css';
import Message from './Message';

interface Props {
    images: Array<ImageInterface> | null;
    deleteImageHandler?: Function;
    editImageHandler?: Function;
}

const ProfileImageCollection: FC<Props> = ({ images, deleteImageHandler, editImageHandler }) => {
    const [selectedId, setSelectedId] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<Array<string>>([]);
    const [tagInput, setTagInput] = useState('');
    const [uploadError, setUploadError] = useState<string | null>(null);

    const openDeleteModal = (id: string) => {
        setSelectedId(id);
        setDeleteModal(true);
    };

    const openEditModal = (image: ImageInterface) => {
        setUploadError(null);
        setSelectedImage(image.url);
        setSelectedId(image._id);
        setDescription(image.description);
        setTags(image.tags);
        setEditModal(true);
    };

    const addTag = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploadError(null);
        if (tags.includes(tagInput)) {
            setUploadError('You already have that tag!');
        } else if (tagInput === '') {
            setUploadError('Cannot have a blank tag!');
        } else {
            const newTags = [...tags];
            newTags.push(tagInput);
            setTags(newTags);
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        let newTags = [...tags];
        newTags = newTags.filter((t) => t !== tag);
        setTags(newTags);
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
                        className='profile-images'
                        src={`https://shopify-image-repo.herokuapp.com/api${image.url}`}
                        rounded
                        fluid
                    />
                    <div className='position-absolute button-container'>
                        <Button variant='warning' onClick={() => openEditModal(image)}>
                            Edit
                        </Button>
                        <Button variant='danger' onClick={() => openDeleteModal(image._id)}>
                            Delete
                        </Button>
                    </div>
                </Col>
            ))}
            <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
                <ModalHeader closeButton>Are you sure you want to delete this image?</ModalHeader>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setDeleteModal(false)}>
                        Close
                    </Button>
                    <Button variant='danger' onClick={() => deleteImageHandler!(selectedId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editModal} onHide={() => setEditModal(false)}>
                <ModalHeader closeButton>Edit</ModalHeader>

                {uploadError && <Message>{uploadError}</Message>}

                <ModalBody>
                    <Form
                        onSubmit={() =>
                            editImageHandler!({
                                _id: selectedId,
                                url: selectedImage,
                                description,
                                tags,
                            })
                        }
                    >
                        <Form.Group>
                            <Image
                                src={`https://shopify-image-repo.herokuapp.com/api${selectedImage}`}
                                alt='trouble loading image'
                                fluid
                            />
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='description'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                autoComplete='off'
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' className='d-none'></Button>
                    </Form>

                    <Form onSubmit={addTag}>
                        <Form.Group controlId='tag'>
                            <Form.Label>Tags</Form.Label>
                            <Form.Control
                                type='tag'
                                placeholder='Enter tag'
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                autoComplete='off'
                            ></Form.Control>
                        </Form.Group>

                        {tags.map((tag: string) => (
                            <span key={tag} className='m-2'>
                                <Button
                                    variant='success'
                                    onClick={() => removeTag(tag)}
                                    style={{ marginBottom: '.5rem' }}
                                >
                                    {tag}
                                </Button>
                            </span>
                        ))}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() =>
                            editImageHandler!({
                                _id: selectedId,
                                url: selectedImage,
                                description,
                                tags,
                            })
                        }
                        variant='primary'
                    >
                        Confirm Edit
                    </Button>
                    <Button variant='warning' onClick={() => setEditModal(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </Row>
    );
};

export default ProfileImageCollection;
