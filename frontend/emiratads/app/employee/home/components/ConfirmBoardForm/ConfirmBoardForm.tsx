import React from "react";
import useConfirmBoardForm from "./useConfirmBoardForm";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button/Button";

export interface ConfirmBoardFormProps {
  code?: string;
  onChange?: (code: string) => void;
  onSubmit: (code: string) => void;
  onClose: () => void;
}

export const ConfirmBoardForm: React.FC<ConfirmBoardFormProps> = ({
  code,
  onClose,
  onChange,
  onSubmit,
}) => {
  const {
    inputValue,
    errors,
    handleSubmit,
    handleInputChange,
    handleButtonClick,
  } = useConfirmBoardForm({ code, onChange, onSubmit });

  return (
    <form className="flex w-full flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          label="Código de Embarque do passageiro:"
          value={inputValue}
          onChange={(e) => handleInputChange("code", e.target.value)}
          error={
            errors.code
              ? [{ hasError: true, message: errors.code.message ?? "" }]
              : []
          }
          extraClasses=""
        />
        <div className="my-4 flex flex-row w-full justify-between mb-4">
          <Button
            text="Cancelar"
            type="SECONDARY"
            size="SMALL"
            onClick={onClose}
          />
          <Button
            text="Confirmar"
            type="PRIMARY"
            size="SMALL"
            typeButton="submit"
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </form>
  );
};

export default ConfirmBoardForm;
