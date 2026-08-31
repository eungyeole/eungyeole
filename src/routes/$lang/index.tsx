import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  component: About,
});

const copy = {
  en: {
    intro:
      "As a frontend engineer at Doodlin (Greeting), I design experiences that are easy to understand at a glance and satisfying to use. Beyond functionality, I focus on making software feel good from the moment it is used.",
    experience: "Experience",
    company: "Doodlin · Greeting",
    role: "Frontend Engineer · Present",
  },
  ko: {
    intro:
      "두들린 (그리팅)에서 프론트엔드 엔지니어로, 사용자가 한눈에 이해하고 만족할 수 있는 경험을 설계합니다. 기능을 넘어, ‘쓰는 순간 좋은 느낌’을 만드는 데 집중하고 있습니다.",
    experience: "경력",
    company: "두들린 · 그리팅",
    role: "Frontend Engineer · 현재",
  },
} as const;

function About() {
  const { lang } = Route.useParams();
  const content = lang === "en" ? copy.en : copy.ko;

  return (
    <div className="max-w-xl">
      <p className="text-base leading-7">{content.intro}</p>

      <section className="mt-10">
        <h2 className="text-sm font-medium">{content.experience}</h2>
        <div className="mt-4 text-sm">
          <a href="https://www.greetinghr.com" target="_blank" rel="noreferrer" className="font-medium">
            {content.company} ↗
          </a>
          <p className="mt-1 text-gray-500">{content.role}</p>
        </div>
      </section>
    </div>
  );
}
