import { NextPage } from "next";
import styled from "styled-components";
import { device, Flex } from "ui";
import Header from "../components/Header";
import Post from "../components/Post";

const PostList: NextPage = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <MainInnerContainer>
          <Flex gap={36} fullWidth>
            <Flex gap={48} direction="column" fullWidth>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <Post title="이것은 제목" postDate="2022.12.04" key={index} />
                ))}
            </Flex>
            <CategoryContainer>adad</CategoryContainer>
          </Flex>
        </MainInnerContainer>
      </MainContainer>
    </>
  );
};

export default PostList;

const Container = styled.div``;

const MainContainer = styled.main`
  max-width: 1140px;
  margin: 0 auto;
`;

const MainInnerContainer = styled.div`
  padding: 40px;

  @media ${device.tablet} {
    padding: 20px;
  }
`;

const CategoryContainer = styled.div`
  width: 400px;
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 4px;
  height: 90vh;
  position: sticky;
  top: 70px;

  @media ${device.tablet} {
    display: none;
  }
`;
