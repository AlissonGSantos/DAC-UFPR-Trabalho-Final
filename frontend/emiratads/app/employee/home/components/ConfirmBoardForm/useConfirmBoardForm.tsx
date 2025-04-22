import { z } from "zod";
import { BoardSchema } from "../../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


interface UseConfirmBoardFormProps {
    code?: string;
    
}

const useConfirmBoardForm = ({code}: UseConfirmBoardFormProps ) => {
    type ConfirmBoardFormData = z.infer<typeof BoardSchema>;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ConfirmBoardFormData>({
        resolver: zodResolver(BoardSchema),
        defaultValues: {
            code: code ?? ""
        },
    });

    return {
        register,
        handleSubmit,
        errors,
        setValue,
    };
    
}

export default useConfirmBoardForm