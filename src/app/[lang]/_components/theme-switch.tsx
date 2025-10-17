"use client";

export const ThemeSwitch = () => {
  return (
    <button
      className="absolute top-4 right-4"
      onClick={() => {
        document.documentElement.classList.toggle("dark");
      }}
    >
      Toggle
    </button>
  );
};
