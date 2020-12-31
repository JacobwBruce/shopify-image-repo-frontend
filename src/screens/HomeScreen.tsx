import React, { FC, FormEvent, useContext } from 'react';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import Loader from '../components/Loader';
import { saveImage, uploadImage } from '../actions/imageActions';
import Message from '../components/Message';
import { AppContext } from '..';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

const HomeScreen: FC = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('');
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [modalVisable, setModalVisable] = useState(false);
    //@ts-ignore
    const { user } = useContext(AppContext);

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setMessage(null);
        const file = e.target.files![0];

        const data = await uploadImage(file);

        if (data.error) {
            setUploadError('Please upload images only');
        } else {
            setUploadError(null);
            setImage(data);
        }

        setLoading(false);
    };

    const submitHandler = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const data = await saveImage(user.token, user._id, image, description, tags);

        setModalVisable(false);

        if (data.error) {
            setSaveError('Error uploading image');
        } else {
            setSaveError(null);
            setMessage('Successfully uploaded image! ✨');
        }

        setLoading(false);
    };

    const tagHandler = (e: any) => {
        console.log(e.target.value);
    };

    const openModal = () => {
        setUploadError(null);
        setModalVisable(true);
    };

    return (
        <div>
            <div className='text-center mt-3'>
                <i
                    className='fas fa-plus-circle mb-3'
                    style={{ fontSize: '3rem', cursor: 'pointer' }}
                    onClick={openModal}
                ></i>
            </div>

            <div className='container'>
                {saveError && <Message>{saveError}</Message>}
                {message && <Message variant='info'>{message}</Message>}
            </div>

            <Modal show={modalVisable} onHide={() => setModalVisable(false)}>
                <ModalHeader>Upload an Image</ModalHeader>

                {uploadError && <Message>{uploadError}</Message>}
                {/* <FormContainer> */}
                <Form onSubmit={submitHandler}>
                    <ModalBody>
                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {loading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='description'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='tag'>
                            <Form.Label>Tags</Form.Label>
                            <Form.Control
                                type='tag'
                                placeholder='Enter tag'
                                value={tagInput}
                                onChange={tagHandler}
                            ></Form.Control>
                        </Form.Group>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' variant='primary'>
                            Upload
                        </Button>
                        <Button variant='warning' onClick={() => setModalVisable(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
                {/* </FormContainer> */}
            </Modal>
        </div>
    );
};

export default HomeScreen;
