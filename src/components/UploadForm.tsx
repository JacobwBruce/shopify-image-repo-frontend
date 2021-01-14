import React, { FC, FormEvent, useState, useContext } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Modal, ModalBody, Form, Button, ModalFooter, Image } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { AppContext } from '..';
import { saveImage, deleteUploadedImage } from '../actions/imageActions';
import useStorage from '../hooks/useStorage';
import Loader from './Loader';
import Message from './Message';

interface Props {
    redirectToLogin: Function;
    refreshImages: Function;
}

const UploadForm: FC<Props> = ({ redirectToLogin, refreshImages }) => {
    const [loading, setLoading] = useState(false);
    // const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<Array<string>>([]);
    const [tagInput, setTagInput] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [modalVisable, setModalVisable] = useState(false);
    const { url, progress } = useStorage(file);
    //@ts-ignore
    const { user } = useContext(AppContext);

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setMessage(null);
        setUploadError(null);
        const selected = e.target.files![0];

        const types = ['image/png', 'image/jpeg', 'image/jpg'];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
        } else {
            setUploadError('Please select a image file (png, jpg or jpeg)');
        }

        setLoading(false);
    };

    const submitHandler = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        saveImageHandler();
    };

    const saveImageHandler = async () => {
        setLoading(true);
        setMessage(null);

        if (!url) {
            setSaveError('Please upload an image to save it');
        } else {
            const data = await saveImage(user.token, user._id, url!, description, tags);

            setModalVisable(false);

            if (data.error) {
                setSaveError('Error uploading image');
            } else {
                setSaveError(null);
                setMessage('Successfully uploaded image! ✨');
                setTimeout(() => setMessage(null), 10 * 1000);
            }

            setLoading(false);
            refreshImages();
        }
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

    const openModal = () => {
        if (Object.entries(user).length === 0) {
            redirectToLogin();
        }

        setFile(null);
        setTagInput('');
        setTags([]);
        setDescription('');
        setUploadError(null);
        setModalVisable(true);
    };

    const removeTag = (tag: string) => {
        let newTags = [...tags];
        newTags = newTags.filter((t) => t !== tag);
        setTags(newTags);
    };

    const cancelUpload = () => {
        // if (image) {
        //     deleteUploadedImage(image);
        // }
        // setModalVisable(false);
        //delete image from firebase
    };

    return (
        <>
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
                <ModalHeader closeButton>Upload an Image</ModalHeader>

                {uploadError && <Message>{uploadError}</Message>}

                <ModalBody>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='image'>
                            {url && <Image src={url} alt='trouble loading image' fluid />}
                            {file && !url && (
                                <ProgressBar
                                    className='my-3'
                                    now={progress | 0}
                                    label={`${progress | 0}%`}
                                />
                            )}
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
                    <Button onClick={saveImageHandler} variant='primary'>
                        Upload
                    </Button>
                    <Button variant='warning' onClick={cancelUpload}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default UploadForm;
