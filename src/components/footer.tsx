import { IconEungyeole } from "./assets/icon-eungyeole";
import { MonaLisaEffect } from "./mona-lisa-effect";

export const Footer = () => {
  return (
    <footer className="mt-12 flex gap-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <a
          href="https://github.com/eungyeole"
          className="text-sm font-medium text-gray-500"
          target="_blank"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/eungyeole/"
          className="text-sm font-medium text-gray-500"
          target="_blank"
        >
          Linkedin
        </a>
      </div>

      <MonaLisaEffect max={-60} min={-120}>
        <IconEungyeole
          width={24}
          height={24}
          className="text-gray-500 rotate-90"
        />
      </MonaLisaEffect>
    </footer>
  );
};
