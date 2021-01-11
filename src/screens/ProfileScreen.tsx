import React, { FC, useState, useEffect, FormEvent, useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '..';
import { deleteImage, getUserImages, updateImage } from '../actions/imageActions';
import { updateProfile } from '../actions/userActions';
import ImageCollection from '../components/ImageCollection';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProfileImageCollection from '../components/ProfileImageCollection';
import ImageInterface from '../interfaces/ImageInterface';

interface Props extends RouteComponentProps<any> {}

const ProfileScreen: FC<Props> = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);
    const [imageMessage, setImageMessage] = useState<string | null>(null);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [images, setImages] = useState<null | Array<ImageInterface>>(null);

    //@ts-ignore
    const { user, setUser } = useContext(AppContext);

    useEffect(() => {
        if (Object.entries(user).length === 0) {
            history.push('/login');
        } else {
            setName(user.name);
            setEmail(user.email);
            getMyImages();
            setImagesLoading(false);
        }
    }, [history, user]);

    const submitHandler = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            const data = await updateProfile(name, email, password);
            //@ts-ignore
            if (data.error) {
                setError('Error updating profile');
            } else {
                setUser(data);
                setMessage('Profile Updated');
            }
        }
        setLoading(false);
    };

    const getMyImages = async () => {
        //@ts-ignore
        const { data } = await getUserImages();

        if (data.length !== 0) {
            setImages(data);
        } else {
            setImages(null);
        }
    };

    const deleteImageHandler = async (imageId: string) => {
        setImagesLoading(true);
        const data = await deleteImage(imageId);
        //@ts-ignore
        if (data.error) {
            console.error(error);
            setImageError('Error deleting image');
        } else {
            setImageMessage('Image deleted');
            await getMyImages();
        }
        setImagesLoading(false);
    };

    const editImageHandler = async (image: ImageInterface) => {
        setImagesLoading(true);
        const data = await updateImage(image);
        //@ts-ignore
        if (data.error) {
            console.error(error);
            setImageError('Error updating image');
        } else {
            setImageMessage('Image Updated');
            await getMyImages();
        }
        setImagesLoading(false);
    };

    return (
        <Row className='m-3'>
            <Col md={3}>
                <h2>User Profile</h2>
                {error && <Message>{error}</Message>}
                {message && <Message variant='info'>{message}</Message>}
                {loading ? (
                    <Loader />
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e: any) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </Col>
            <Col md={9}>
                <h2>My Images</h2>
                {imageError && <Message>{imageError}</Message>}
                {imageMessage && <Message variant='info'>{imageMessage}</Message>}
                {imagesLoading ? (
                    <Loader />
                ) : !images ? (
                    <Message variant='info'>You have no images</Message>
                ) : (
                    <ProfileImageCollection
                        images={images}
                        deleteImageHandler={deleteImageHandler}
                        editImageHandler={editImageHandler}
                    />
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
