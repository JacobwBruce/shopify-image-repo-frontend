import React, { FC } from 'react';
import './css/SquareLoader.css';

const SquareLoader: FC = () => {
    return (
        <>
            <div className='text-center d-flex flex-column align-items-center'>
                <div className='spinner-box '>
                    <div className='configure-border-1'>
                        <div className='configure-core'></div>
                    </div>
                    <div className='configure-border-2'>
                        <div className='configure-core'></div>
                    </div>
                </div>
                <h2 className='p-3'>
                    If the server has been idling, this might take longer than expected to load
                </h2>
            </div>
        </>
    );
};

export default SquareLoader;
