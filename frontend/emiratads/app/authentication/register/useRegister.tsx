"use client"
import { useState } from "react";

const useRegisterForm = () => {
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    return {
        isToastOpen,
        setIsToastOpen,
        errorMessage,
        setErrorMessage,
    };
}

export default useRegisterForm;