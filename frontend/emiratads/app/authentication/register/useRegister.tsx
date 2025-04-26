import { useState } from "react"

const useRegister = () => {
    const [modalState, setModalState] = useState(false)

    const handleModalState = (state: boolean) => {
        setModalState(state)
    }

    return {
        modalState,
        handleModalState
    }
}

export default useRegister;