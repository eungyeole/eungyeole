import { FC, ReactNode } from "react";
import styled from "styled-components";
import { Flex, Text } from "ui";

interface CommonFormTemplateProps {
  title: string;
  description: string;
  children: ReactNode;
}

const CommonFormTemplate: FC<CommonFormTemplateProps> = ({
  title,
  description,
  children,
  ...props
}: CommonFormTemplateProps) => {
  return (
    <Container {...props} gap={24} direction="column">
      <Flex gap={24} direction="column" align="center">
        <Text size="xxxxlarge">🖋️</Text>
        <Flex gap={8} direction="column" align="center">
          <Text size="xxlarge" weight="bold">
            {title}
          </Text>
          <Text size="small" color="gray600" align="center">
            {description}
          </Text>
        </Flex>
      </Flex>
      <div className="common-form-template">{children}</div>
    </Container>
  );
};

export default CommonFormTemplate;

const Container = styled(Flex)`
  max-width: 380px;
  margin: 0 auto;
  margin-top: 50px;
`;
