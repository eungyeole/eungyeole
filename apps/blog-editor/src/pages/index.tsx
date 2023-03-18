import { GetServerSideProps } from "next";

import { localApiClient } from "src/apis/client";
import { Button, Text } from "ui";

export default function Web() {
  return (
    <div>
      <Text>blog-editor: Hello World</Text>

      <Button>Click me</Button>
    </div>
  );
}
