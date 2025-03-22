import { ButtonSize, ButtonType } from "./Button";

export const useButton = (type: ButtonType, size: ButtonSize) => {

    const getButtonColor = () => {
        switch (type) {
            case 'PRIMARY':
                return 'bg-sky-600 hover:bg-sky-500 text-white border-0'
            case 'SECONDARY':
                return 'bg-amber-600 hover:bg-amber-500 text-white border-0'
            case 'TERTIARY':
                return 'bg-transparent border-2 border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white'
            case 'DANGER':
                return 'bg-red-800 hover:bg-red-700 text-white border-0'
            case 'SUCCESS':
                return 'bg-emerald-700 hover:bg-emerald-600 text-white border-0'
            case 'WARNING':
                return 'bg-yellow-600 hover:bg-yellow-500 text-white border-0'
            case 'QUATERNARY':
                return 'bg-gray-600 hover:bg-gray-500 text-white border-0'
            default:
                return 'bg-sky-600 hover:bg-sky-500 text-white border-0'
        }
    }

    const getButtonSize = () => {
        switch (size) {
            case 'SMALL':
                return 'p-2'
            case 'MEDIUM':
                return 'p-3'
            case 'LARGE':
                return 'p-4'
        }
    }

    return {
        getButtonColor,
        getButtonSize
    }

}