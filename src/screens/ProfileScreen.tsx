import React, { FC, useState, useEffect, FormEvent } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {}

const ProfileScreen: FC<Props> = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    let userInfo = {};

    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push('/login');
    //     } else {
    //         if (!user.name || !user || success) {
    //             dispatch({ type: USER_UPDATE_PROFILE_RESET });
    //             dispatch(getUserDetails('profile'));
    //             dispatch(listMyOrders());
    //         } else {
    //             setName(user.name);
    //             setEmail(user.email);
    //         }
    //     }
    // }, [history, userInfo, dispatch, user, success]);

    const submitHandler = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            // dispatch(updateUserProfile({ id: user._id, name, email, password }));
            alert('Update profile');
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {/* {loading && <Loader />} */}
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
            </Col>
            <Col md={9}>
                <h2>My Images</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;