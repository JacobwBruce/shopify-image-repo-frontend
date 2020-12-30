import React from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
    variant?: string;
}

const Message: React.FC<Props> = ({ variant, children }) => {
    return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
    variant: 'warning',
};

export default Message;
