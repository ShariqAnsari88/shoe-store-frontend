import React from "react";

interface WrapperProps {
    className?: string
    children: JSX.Element | JSX.Element[]
}

const Wrapper = ({ children, className }: WrapperProps) => {
    return (
        <div
            className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto ${
                className || ""
            }`}
        >
            {children}
        </div>
    );
};

export default Wrapper;
