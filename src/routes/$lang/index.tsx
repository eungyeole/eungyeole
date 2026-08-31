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
    company: "Doodlin · Greeting",
    roles: [
      { title: "Product Engineer", period: "2026.04 — Present" },
      { title: "Frontend Engineer", period: "2022.01 — 2026.03" },
    ],
  },
  ko: {
    introPrefix: "",
    introCompany: "두들린 (그리팅)",
    introSuffix:
      "에서 프로덕트 엔지니어로, 사용자가 한눈에 이해하고 만족할 수 있는 경험을 설계합니다. 기능을 넘어, ‘쓰는 순간 좋은 느낌’을 만드는 데 집중하고 있습니다.",
    experience: "경력",
    company: "두들린 · 그리팅",
    roles: [
      { title: "Product Engineer", period: "2026.04 — 현재" },
      { title: "Frontend Engineer", period: "2022.01 — 2026.03" },
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
        <div className="mt-4 text-sm">
          <a href="https://www.greetinghr.com" target="_blank" rel="noreferrer" className="font-medium">
            {content.company} ↗
          </a>
          <div className="mt-2 divide-y divide-black/8 border-y border-black/8">
            {content.roles.map((role) => (
              <div key={role.title} className="flex items-center justify-between py-3">
                <span>{role.title}</span>
                <span className="text-gray-500">{role.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
