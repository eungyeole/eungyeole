import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  component: About,
});

const copy = {
  en: {
    introPrefix: "As a product engineer at ",
    introCompany: "Doodlin (Greeting)",
    introSuffix:
      ", I design experiences that are easy to understand at a glance and satisfying to use. Beyond functionality, I focus on making software feel good from the moment it is used.",
    experience: "Experience",
    experiences: [
      {
        company: "Doodlin · Greeting",
        href: "https://www.greetinghr.com",
        roles: [
          { title: "Product Engineer", period: "2026.04 — Present", current: true },
          { title: "Frontend Engineer", period: "2022.01 — 2026.03", current: false },
        ],
      },
    ],
  },
  ko: {
    introPrefix: "",
    introCompany: "두들린 (그리팅)",
    introSuffix:
      "에서 프로덕트 엔지니어로, 사용자가 한눈에 이해하고 만족할 수 있는 경험을 설계합니다. 기능을 넘어, ‘쓰는 순간 좋은 느낌’을 만드는 데 집중하고 있습니다.",
    experience: "경력",
    experiences: [
      {
        company: "두들린 · 그리팅",
        href: "https://www.greetinghr.com",
        roles: [
          { title: "Product Engineer", period: "2026.04 — 현재", current: true },
          { title: "Frontend Engineer", period: "2022.01 — 2026.03", current: false },
        ],
      },
    ],
  },
} as const;

function About() {
  const { lang } = Route.useParams();
  const content = lang === "en" ? copy.en : copy.ko;

  return (
    <div className="max-w-xl">
      <p className="text-base leading-7">
        {content.introPrefix}
        <a
          href="https://www.greetinghr.com"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-dashed border-gray-500"
        >
          {content.introCompany}
        </a>
        {content.introSuffix}
      </p>

      <section className="mt-10">
        <h2 className="text-sm font-medium">{content.experience}</h2>
        <ol className="mt-5 space-y-10">
          {content.experiences.map((experience) => (
            <li key={experience.company}>
              <a
                href={experience.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium"
              >
                {experience.company} ↗
              </a>

              <div className="relative mt-4">
                <span
                  aria-hidden="true"
                  className="absolute top-2 bottom-2 left-[3px] w-px bg-foreground/10"
                />
                <ol className="space-y-5">
                  {experience.roles.map((role) => (
                    <li key={role.title} className="relative pl-6">
                      <span
                        aria-hidden="true"
                        className={`absolute top-[0.4rem] left-0 size-[7px] rounded-full ring-4 ring-background ${
                          role.current ? "bg-foreground" : "bg-foreground/25"
                        }`}
                      />
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                        <span className="text-sm">{role.title}</span>
                        <time className="text-xs text-gray-500 tabular-nums">{role.period}</time>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
