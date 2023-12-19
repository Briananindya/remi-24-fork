import React from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
    onClickFunction: () => void;
    children: React.ReactNode;
};

const MyButton: React.FC<ButtonProps> = ({ onClickFunction, children }) => {
    return (
        <Button
            onClick={onClickFunction}
            className="text-purple scale-150 bg-gray-800 rounded-3xl mt-8 ms-5 me-5 hover:rounded-xl hover:bg-gray-800 hover:text-purple-600 transition-all duration-75 ease-linear"
            style={{ textTransform: 'none' }}
        >
            {children}
        </Button>
    );
};

export default MyButton;
