import React, { useState } from 'react'
import useConfirmBoardForm from './useConfirmBoardForm';
import Input from '@/app/components/Input/Input';
import Button from '@/app/components/Button/Button';

export interface ConfirmBoardFormProps {
    code?: string
    onChange?: (code: String) => void;
    onSubmit: (code: String) => void;
    onClose: () => void;
    onError?: (error: boolean) => void;
}

export const ConfirmBoardForm: React.FC<ConfirmBoardFormProps> = ({
    code: initialCode = "",
    onChange,
    onSubmit,
    onClose,
    onError,
}) => {
  const [inputValue, setInputValue] = useState(initialCode);
  const { register, handleSubmit, errors, setValue } = useConfirmBoardForm({
    code: initialCode,
  });
  
  const handleInputChange = (field: 'code', value: any) => {
    setInputValue(value); // Atualiza o estado local para refletir o que o usuário está digitando
    if (onChange && field === 'code') {
      onChange(value as String);
    }
    setValue(field, value, { shouldValidate: true });
  };

  return (
      <form className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit((data) => {
          const payload: String = data.code;
          onSubmit(payload);
        })}>
          <div>
          <Input
            type={"text"}
            label={"Código de Embarque do passageiro:"}
            value={inputValue} // Use o estado local em vez do prop diretamente
            onChange={(e) => {
              handleInputChange('code', e.target.value);
            }}
            error={
              errors.code
                ? [{ hasError: true, message: errors.code.message ?? "" }]
                : []
            }
            extraClasses=''
          />
          <div className="my-4 flex flex-row w-full justify-between mb-4">
          <Button
            text="Cancelar"
            type="SECONDARY"
            size="SMALL"
            onClick={onClose}
            />
          <Button
            text={"Confirmar"}
            type={"PRIMARY"}
            size="SMALL"
            typeButton="submit"
            onClick={(e) => {
              e.preventDefault();
              if (e.target.textContent === "Confirmar") {
                  handleSubmit((data) => {
                      const payload: String = data.code;
                      onSubmit(payload);
                  })();
                }
            }}    
            />
        </div>
            </div>
      </form>
  )
}

export default ConfirmBoardForm