import React from 'react'

interface ShortcutProps{
    name: string
    link: string
}

const Shortcut: React.FC<ShortcutProps> = ({name,link}) => {
  return (
    <li key={name} className="flex w-full justify-center items-center hover:bg-sky-800 p-1">
        <a href={link} className="text-white text-lg w-full text-center p-2">{name}</a>
    </li>
  )
}

export default Shortcut