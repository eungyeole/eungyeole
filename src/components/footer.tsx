import { IconEungyeole } from "./assets/icon-eungyeole";
import { MonaLisaEffect } from "./mona-lisa-effect";

export const Footer = () => {
  return (
    <footer className="mt-12 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/eungyeole"
          className="text-sm font-medium text-gray-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/eungyeole/"
          className="text-sm font-medium text-gray-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </a>
      </div>

      <MonaLisaEffect offset={90} max={-60} min={-120}>
        <IconEungyeole width={24} height={24} className="text-gray-500" />
      </MonaLisaEffect>
    </footer>
  );
};
