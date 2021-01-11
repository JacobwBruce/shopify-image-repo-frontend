import React, { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const SearchBox: FC<RouteComponentProps> = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search by image tags...'
                className='mr-sm-2 ml-sm-5'
                autoComplete='off'
            ></Form.Control>
            <Button
                type='submit'
                variant='success'
                // style={{ color: 'white' }}
                className='p-2'
            >
                Search
            </Button>
        </Form>
    );
};

export default withRouter(SearchBox);
