import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";

interface ShortcutProps {
  name: string;
  link: string;
  sidebar?: boolean;
}

const Shortcut: React.FC<ShortcutProps> = ({ name, link, sidebar }) => {
  return (
    <li
      key={name}
      className={`flex w-full justify-center items-center mx-2 px-2 py-4 rounded-md ${
        sidebar ? "hover:bg-slate-900" : ""
      } p-1`}
    >
      <a
        href={link}
        className={`text-slate-200 text-md w-full uppercase text-center p-2${robotoFont.className}`}
      >
        {name}
      </a>
    </li>
  );
};

export default Shortcut;
