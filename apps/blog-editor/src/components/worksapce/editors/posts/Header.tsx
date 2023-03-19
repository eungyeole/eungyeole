import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { BiArrowFromLeft, BiLeftArrowAlt } from "react-icons/bi";
import styled from "styled-components";
import { Button, Icon } from "ui";

interface HeaderProps {
  rightContent?: ReactNode;
}
const Header: FC<HeaderProps> = ({ rightContent }) => {
  const router = useRouter();

  return (
    <Container>
      <Button
        onClick={() => router.back()}
        variant="quiet"
        size="small"
        leadingIcon={
          <Icon>
            <BiLeftArrowAlt size={22} />
          </Icon>
        }
      >
        prev
      </Button>
      {rightContent}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  padding: 0 24px;
`;
