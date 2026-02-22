import Link from "next/link";
import { Card } from "./_components/card/card";

export default function Sandbox() {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {Array.from({ length: 10 }).map((_, index) => (
      <Link
        href={`/sandbox/${index}`}
        key={index}
      >
        <Card>
          adad
        </Card>
      </Link>
    ))}
  </div>
}
