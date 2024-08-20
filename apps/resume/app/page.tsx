import { Metadata } from "next";

const title = "안은결 | Resume";
const description = "안은결의 이력서입니다.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "안은결",
    "개발자",
    "Frontend",
    "Engineer",
    "Blog",
    "블로그",
    "프론트엔드",
    "eungyeole",
  ],
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

async function Page() {
  return <></>;
}

export default Page;
