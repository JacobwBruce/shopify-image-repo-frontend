import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './bootstrap.min.css';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { useState } from 'react';
import Header from './components/Header';

//@ts-ignore
export const AppContext = React.createContext();

const Routing = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')!) || {});

    return (
        <AppContext.Provider value={{ user, setUser }}>
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomeScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                </Switch>
            </Router>
        </AppContext.Provider>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Routing />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
