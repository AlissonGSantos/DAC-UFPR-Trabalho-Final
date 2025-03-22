"use client"

import React from 'react'
import { useButton } from './useButton'

export type ButtonType = 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'DANGER' | 'SUCCESS' | 'WARNING' | 'QUATERNARY'

export type ButtonSize = 'SMALL' | 'MEDIUM' | 'LARGE'

interface ButtonProps{
  text: string
  onClick?: () => void
  type?: ButtonType
  disabled?: boolean
  extraClass?: string
  size?: ButtonSize
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'PRIMARY',
  disabled = false,
  size = 'MEDIUM',
  extraClass = ''
}) => {
  
  const {getButtonColor, getButtonSize} = useButton(type, size)

  return (
    <button
      className={`cursor-pointer ${getButtonColor()} ${getButtonSize()} rounded-lg ${extraClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button