import Link from "next/link";
import { FC } from "react";
import styled, { css } from "styled-components";
import { device, Flex, Text } from "ui";
import { useScroll } from "utils";

const Header: FC = () => {
  const { y } = useScroll();

  const isScroll = y > 0;

  return (
    <HeaderContainer isScroll={isScroll}>
      <HeaderWrapper fullHeight fullWidth>
        <HeaderWrapperInner
          justify="space-between"
          align="center"
          fullWidth
          fullHeight
        >
          <Link href="/">
            <Flex fullHeight>
              <Text as="h1" size="large" weight="medium">
                eungyeole.
                <Text as="span" size="large" weight="regular">
                  blog
                </Text>
              </Text>
            </Flex>
          </Link>
          <Flex gap={20}>
            <Text size="small">홈</Text>
            <Text size="small" weight="medium">
              블로그
            </Text>
            <Text size="small">포트폴리오</Text>
          </Flex>
        </HeaderWrapperInner>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<{ isScroll: boolean }>`
  width: 100%;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 99;

  background-color: ${({ theme }) => theme.colors.white};
  /* background-color: ${({ theme, isScroll }) =>
    isScroll ? theme.colors.white : "transparent"}; */

  ${({ isScroll }) =>
    isScroll &&
    css`
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
    `}
`;

const HeaderWrapper = styled(Flex)`
  max-width: 1140px;
  margin: 0 auto;
`;

const HeaderWrapperInner = styled(Flex)`
  padding: 0 40px;

  @media ${device.tablet} {
    padding: 0 20px;
  }
`;
