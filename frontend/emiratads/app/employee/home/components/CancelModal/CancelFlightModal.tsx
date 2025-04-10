"use client";

import React from 'react';
import Modal from "@/app/components/Modal/Modal";
import Button from "@/app/components/Button/Button";
import { Flight } from '@/app/types/FlightTypes';

export interface CancelModalProps {
    flight: Flight
    isOpen: boolean;    
    onClose: () => void;
    onDelete: (estado: Flight) => void;
}

const CancelFlightModal : React.FC<CancelModalProps>  = ({ flight, isOpen, onClose, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Cancelar Voo'>
      <div>
        
        <p className='text-slate-300 font-semibold'>Você tem certeza que deseja cancelar o voo {flight.codigo}?</p>
        <div className='flex justify-end gap-2 mt-4'>
            <Button
            text="Cancelar"
            type="SECONDARY"
            size="SMALL"
            onClick={onClose}
            extraClass=''
          />
          <Button
            text={"Deletar"}
            type={"DANGER"}
            size="SMALL"
            onClick={onDelete}
            extraClass=''
          />
        </div>
      </div>
    </Modal>
  );
}

export default CancelFlightModal;