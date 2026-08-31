import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/")({
  component: About,
});

const copy = {
  en: {
    intro: [
      "I’m Eungyeol An, a frontend engineer at Doodlin, working on Greeting.",
      "I design and build experiences that feel understandable at a glance and satisfying in use — with care for the small details that make software feel just right.",
    ],
    experience: "Experience",
    company: "Doodlin · Greeting",
    role: "Frontend Engineer · Present",
  },
  ko: {
    intro: [
      "안은결입니다. 두들린에서 프론트엔드 엔지니어로 그리팅을 만들고 있습니다.",
      "사용자가 한눈에 이해하고 쓰는 순간 만족할 수 있는 경험을 설계합니다. 소프트웨어를 기분 좋게 만드는 작지만 중요한 디테일에 집중합니다.",
    ],
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
      <div className="space-y-4">
        {content.intro.map((paragraph) => (
          <p key={paragraph} className="text-base leading-7">
            {paragraph}
          </p>
        ))}
      </div>

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
