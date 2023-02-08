---
to: apps/<%= name %>/src/pages/index.tsx
---
import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <h1><%= name %>: Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}
