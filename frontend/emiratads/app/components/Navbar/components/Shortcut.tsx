import React from 'react'

interface ShortcutProps{
    name: string
    link: string
}

const Shortcut: React.FC<ShortcutProps> = ({name,link}) => {
  return (
    <li key={name} className="inline-block mx-2">
        <a href={link} className="text-white hover:text-sky-300">{name}</a>
    </li>
  )
}

export default Shortcut