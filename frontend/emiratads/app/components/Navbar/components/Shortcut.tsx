import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";

interface ShortcutProps {
  name: string;
  link: string;
}

const Shortcut: React.FC<ShortcutProps> = ({ name, link }) => {
  return (
    <li
      key={name}
      className="flex w-full justify-center items-center mx-2 px-2 hover:bg-sky-800 p-1"
    >
      <a
        href={link}
        className={` text-white text-md w-full uppercase text-center p-2${robotoFont.className}`}
      >
        {name}
      </a>
    </li>
  );
};

export default Shortcut;
