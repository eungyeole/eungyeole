import Link from "next/link";
import Header from "../components/common/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/">all posts</Link>
      </p>
    </>
  );
}
