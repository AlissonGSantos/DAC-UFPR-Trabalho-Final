"use client"
import { useState } from "react";

interface Shortcut{
    name: string
    link: string
    enabled?: boolean
}

const useNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const shortcuts: Shortcut[] = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Services', link: '/services' },
        { name: 'Contact', link: '/contact' },
        { name: 'Login', link: '/login' }
    ]

    return { isOpen, toggle, shortcuts };
}

export { useNavbar };