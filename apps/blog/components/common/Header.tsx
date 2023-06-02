import { Button, Flex } from "ui";
import BaseHeader from "./BaseHeader";

const Header = () => {
  return (
    <BaseHeader
      rightContent={
        <Flex gap={8}>
          <Button size="small" variant="quiet">
            홈
          </Button>
          <Button size="small" variant="quiet">
            이력서
          </Button>
        </Flex>
      }
    />
  );
};

export default Header;
