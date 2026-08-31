import { IconEungyeole } from "./assets/icon-eungyeole";
import { MonaLisaEffect } from "./mona-lisa-effect";

export const Footer = () => {
  return (
    <footer className="mt-24 flex items-center justify-between border-t border-border py-8 sm:mt-32">
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/eungyeole"
          className="text-[13px] font-medium text-muted transition-colors hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/eungyeole/"
          className="text-[13px] font-medium text-muted transition-colors hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </a>
      </div>

      <MonaLisaEffect offset={90} max={-60} min={-120}>
        <IconEungyeole width={26} height={26} className="text-subtle transition-colors hover:text-foreground" />
      </MonaLisaEffect>
    </footer>
  );
};
