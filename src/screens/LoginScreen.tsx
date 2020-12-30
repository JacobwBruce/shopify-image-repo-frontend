import React, { FC, useState, useEffect, FormEvent, useContext } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppContext } from '..';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

interface Props extends RouteComponentProps<any> {}

const LoginScreen: FC<Props> = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        const data = await login(email, password);
        //@ts-ignore
        if (data.error) {
            console.log('error signing in');
        } else {
            setUser(data);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/* {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
