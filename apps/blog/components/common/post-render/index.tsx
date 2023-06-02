import { device, Text } from "ui";
import styled from "styled-components";
import { theme } from "./theme";

interface PostRenderProps {
  content: string;
}

const PostRender = ({ content }: PostRenderProps) => {
  return (
    <Container>
      <div className="block-wrapper">
        <Render
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </Container>
  );
};

export default PostRender;

const Container = styled.div`
  position: relative;

  * {
    margin: 0;
  }

  line-height: 1.5;
`;

const Render = styled.div`
  outline: none;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.fonts.sizes.large};

  @media ${device.tablet} {
    font-size: 17px;
  }

  & .${theme.ltr} {
    padding-bottom: 4px;
    box-sizing: border-box;
  }

  & .${theme.code} {
    background-color: ${({ theme }) => theme.colors.gray100};
    border-radius: 6px;
    font-family: Menlo, Consolas, Monaco, monospace;
    display: block;
    padding: 24px 32px;
    margin: 8px 0px;
    font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
    white-space: pre;
    tab-size: 2;
    overflow-x: auto;
    position: relative;

    .tokenComment {
      color: slategray;
    }
    .tokenPunctuation {
      color: #999;
    }
    .tokenProperty {
      color: #905;
    }
    .tokenSelector {
      color: #690;
    }
    .tokenOperator {
      color: #9a6e3a;
    }
    .tokenAttr {
      color: #dd4a68;
    }
    .tokenVariable {
      color: #e90;
    }
    .tokenFunction {
      color: #07a;
    }
  }

  & .${theme.quote} {
    color: ${({ theme }) => theme.colors.gray900};
    border-radius: 6px;
    position: relative;
    padding: 0px 0px 0px 20px;
    margin: 16px 0;

    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 3px;
      height: 100%;
      background-color: ${({ theme }) => theme.colors.gray900};
      border-radius: 4px;
      margin: 0px;
    }
  }

  h1,
  h2,
  h3 {
    color: ${({ theme }) => theme.colors.gray800};
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    margin: 36px 0px 16px 0px;

    @media ${device.tablet} {
      margin: 28px 0px 16px 0px;
    }
  }

  h1 {
    font-size: ${({ theme }) => theme.fonts.sizes.xxlarge};

    @media ${device.tablet} {
      font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fonts.sizes.xlarge};

    @media ${device.tablet} {
      font-size: ${({ theme }) => theme.fonts.sizes.large};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fonts.sizes.large};

    @media ${device.tablet} {
      font-size: 17px;
    }
  }

  .textBold {
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
  }
  .textItalic {
    font-style: italic;
  }
  .textUnderline {
    text-decoration: underline;
  }
  .textStrikethrough {
    text-decoration: line-through;
  }
  .textUnderlineStrikethrough {
    text-decoration: underline line-through;
  }

  // 임시 스타일
  a {
    color: #1a73e8;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
  .ul,
  ol {
    margin: 0;
    list-style-position: inside;
    padding-left: 0;
  }

  .nestedListItem {
    list-style-type: none;
  }
  .nestedListItem:before,
  .nestedListItem:after {
    display: none;
  }
`;

const Placeholder = styled(Text)`
  position: absolute;
  padding: 0 16px;
  top: 0;
  left: 0;
  z-index: -1;

  color: ${({ theme }) => theme.colors.gray500};
`;
