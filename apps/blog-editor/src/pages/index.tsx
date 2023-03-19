import Link from "next/link";

import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <Link href="/auth/signin">
        <Button>go to login</Button>
      </Link>
    </div>
  );
}
