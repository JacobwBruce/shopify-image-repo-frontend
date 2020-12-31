import React, { FC, useState, useEffect, FormEvent, useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppContext } from '..';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

interface Props extends RouteComponentProps<any> {}

const RegisterScreen: FC<Props> = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);

    //@ts-ignore
    const { user, setUser } = useContext(AppContext);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (Object.entries(user).length !== 0) {
            history.push(redirect);
        }
    }, [history, user, redirect]);

    const submitHandler = async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            const data = await register(name, email, password);
            //@ts-ignore
            if (data.error) {
                setError('User already exists');
            } else {
                setUser(data);
            }
        }
        setLoading(false);
    };

    return (
        <FormContainer>
            <h1 className='mt-3'>Sign Up</h1>

            {error && <Message>{error}</Message>}
            {loading ? (
                <Loader />
            ) : (
                <>
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
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e: any) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Register
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            Have an Account?{' '}
                            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                Login
                            </Link>
                        </Col>
                    </Row>
                </>
            )}
        </FormContainer>
    );
};

export default RegisterScreen;
