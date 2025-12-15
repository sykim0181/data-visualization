"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full flex justify-end items-center">
      <button
        className="w-10 h-10 rounded-full cursor-pointer flex justify-center items-center bg-(--card)"
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      >
        <Image
          src={
            theme === "light"
              ? "/icons/theme_black.png"
              : "/icons/theme_white.png"
          }
          alt="theme icon"
          width={30}
          height={30}
        />
      </button>
    </header>
  );
};

export default Header;
