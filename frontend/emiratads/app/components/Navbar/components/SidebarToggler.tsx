"use client"

import React from 'react';

interface SidebarTogglerProps {
    onClick: () => void;
}

const SidebarToggler: React.FC<SidebarTogglerProps> = ({onClick}) => {
    return (
            <button  onClick={onClick} className="flex flex-col justify-between w-8 h-6 cursor-pointer text-white focus:outline-none">
                <div className="w-full h-1 bg-white rounded"></div>
                <div className="w-full h-1 bg-white rounded"></div>
                <div className="w-full h-1 bg-white rounded"></div>
            </button>
    );
};

export default SidebarToggler;