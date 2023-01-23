import { Flex, Text } from "ui";
import BaseHeader from "./BaseHeader";

const MainHeader = () => {
  return (
    <BaseHeader
      rightContent={
        <Flex gap={20}>
          <Text size="small">홈</Text>
          <Text size="small" weight="medium">
            블로그
          </Text>
          <Text size="small">포트폴리오</Text>
        </Flex>
      }
    />
  );
};

export default MainHeader;
