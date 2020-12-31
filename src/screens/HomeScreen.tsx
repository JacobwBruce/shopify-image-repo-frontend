import React, { FC, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '..';
import UploadForm from '../components/UploadForm';

const HomeScreen: FC<RouteComponentProps> = ({ history }) => {
    //@ts-ignore
    const { user } = useContext(AppContext);

    const redirectToLogin = () => {
        history.push('/login');
    };

    return (
        <div>
            <UploadForm redirectToLogin={redirectToLogin} />
        </div>
    );
};

export default HomeScreen;
