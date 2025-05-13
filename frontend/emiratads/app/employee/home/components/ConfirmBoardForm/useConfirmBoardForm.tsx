import { z } from "zod";
import { BoardSchema } from "../../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface UseConfirmBoardFormProps {
  code?: string;
  onChange?: (code: string) => void;
  onSubmit: (code: string) => void;
}

const useConfirmBoardForm = ({
  code: initialCode = "",
  onChange,
  onSubmit,
}: UseConfirmBoardFormProps) => {
  type ConfirmBoardFormData = z.infer<typeof BoardSchema>;

  const [inputValue, setInputValue] = useState(initialCode);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConfirmBoardFormData>({
    resolver: zodResolver(BoardSchema),
    defaultValues: {
      code: initialCode ?? "",
    },
  });

  const handleInputChange = (field: "code", value: any) => {
    setInputValue(value);
    if (onChange && field === "code") {
      onChange(value as string);
    }
    setValue(field, value, { shouldValidate: true });
  };

  const submitHandler = handleSubmit((data) => {
    const payload: string = data.code;
    onSubmit(payload);
  });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent === "Confirmar") {
      submitHandler();
    }
  };

  return {
    inputValue,
    register,
    handleSubmit: submitHandler,
    errors,
    setValue,
    handleInputChange,
    handleButtonClick,
  };
};

export default useConfirmBoardForm;
