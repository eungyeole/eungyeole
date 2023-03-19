import Link from "next/link";

import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <a href="/workspaces">
        <Button>go to login</Button>
      </a>
    </div>
  );
}
