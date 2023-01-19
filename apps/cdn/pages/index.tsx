import { Button, Flex, Text } from "ui";

export default function Cdn() {
  return (
    <Flex direction="column" gap={20} fullWidth align="center">
      <Text weight="medium" size="xlarge">
        eungyeole.
        <Text as="span" size="xlarge">
          cdn
        </Text>
      </Text>

      <a
        href="https://github.com/eungyeole/eungyeole"
        target="_blank"
        rel="noreferrer"
      >
        <Button size="large">Go to Github</Button>
      </a>
    </Flex>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
