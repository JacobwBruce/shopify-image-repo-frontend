import React, { FC, useState, useEffect, FormEvent, useContext } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '..';
import { updateProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

interface Props extends RouteComponentProps<any> {}

const ProfileScreen: FC<Props> = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    //@ts-ignore
    const { user, setUser } = useContext(AppContext);

    useEffect(() => {
        if (Object.entries(user).length === 0) {
            history.push('/login');
        } else {
            setName(user.name);
            setEmail(user.email);
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
            </Col>
        </Row>
    );
};

export default ProfileScreen;
