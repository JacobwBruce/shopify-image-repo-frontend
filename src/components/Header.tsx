import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AppContext } from '..';
import SearchBox from './SearchBox';

const Header: React.FC = () => {
    //@ts-ignore
    const { user, setUser } = useContext(AppContext);

    const logoutHandler = () => {
        localStorage.removeItem('user');
        setUser({});
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Imageify</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <SearchBox />
                        <Nav className='ml-auto mr-2'>
                            <NavDropdown title='View Code' id='code-links'>
                                <NavDropdown.Item
                                    href='https://github.com/JacobwBruce/shopify-image-repo-backend'
                                    target='__blank'
                                >
                                    Back end
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href='https://github.com/JacobwBruce/shopify-image-repo-frontend'
                                    target='__blank'
                                >
                                    Front end
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {Object.entries(user).length !== 0 ? (
                                <NavDropdown title={user.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
