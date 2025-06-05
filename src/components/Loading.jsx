import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <PulseLoader
                    margin={2}
                    size={30}
                    color="#D946EF"
                />
            </div>
        </div>
    );
};

export default Loading;