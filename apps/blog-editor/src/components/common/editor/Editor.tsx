import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkNode } from "@lexical/link";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { device, Text } from "ui";
import { FC, useState } from "react";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  EditorState,
  Klass,
  LexicalNode,
  SerializedEditorState,
} from "lexical";
import { MarkdownShortcutPlugin } from "./plugins/MarkdownShortcutPlugin";
import { CodeHighlightPlugin } from "./plugins/CodeHighLightPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import AddBlockMenuPlugin from "./plugins/AddBlockMenuPlugin";
import styled from "styled-components";
import { theme } from "./theme";

export const nodes: Klass<LexicalNode>[] = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  LinkNode,
  CodeHighlightNode,
];

interface EditorProps {
  defaultValue?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  readOnly?: boolean;
  placeholder?: string;
}
const Editor: FC<EditorProps> = ({
  defaultValue,
  onChange,
  readOnly = false,
  placeholder,
}) => {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <>
      <LexicalComposer
        initialConfig={{
          namespace: "blog",
          nodes,
          onError: (error) => {
            console.error(error);
          },
          editorState: (editor) => {
            defaultValue &&
              editor.setEditorState(editor.parseEditorState(defaultValue));
          },
          theme,
          editable: !readOnly,
        }}
      >
        {readOnly ? (
          <></>
        ) : (
          <>
            {floatingAnchorElem && (
              <>
                <ToolbarPlugin anchorElement={floatingAnchorElem} />
                <AddBlockMenuPlugin anchorElement={floatingAnchorElem} />
              </>
            )}
            <MarkdownShortcutPlugin />
            {onChange && <OnChangePlugin onChange={onChange} />}
            <TabIndentationPlugin />
            <HistoryPlugin />
          </>
        )}

        <RichTextContainer>
          <RichTextPlugin
            contentEditable={
              <div className="block-wrapper" ref={onRef}>
                <StyledContentEditable
                  style={{
                    padding: readOnly ? "0px" : "0 16px",
                  }}
                />
              </div>
            }
            placeholder={<Placeholder size="large">{placeholder}</Placeholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </RichTextContainer>
        <ListPlugin />
        <CodeHighlightPlugin />
      </LexicalComposer>
    </>
  );
};

export default Editor;

const RichTextContainer = styled.div`
  position: relative;

  * {
    margin: 0;
  }

  line-height: 1.5;
`;

const StyledContentEditable = styled(ContentEditable)`
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
    color: ${({ theme }) => theme.colors.primary};
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
      background-color: ${({ theme }) => theme.colors.primary};
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

  .ul {
    margin: 0;
    list-style-position: inside;
  }

  & > .ul {
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
