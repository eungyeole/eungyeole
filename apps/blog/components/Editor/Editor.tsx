import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkNode } from "@lexical/link";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { Text } from "ui";
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
import styled from "styled-components";

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
  onChange: (editorState: EditorState) => void;
}
const Editor: FC<EditorProps> = ({ defaultValue, onChange }) => {
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
        }}
      >
        <ToolbarPlugin />
        <RichTextContainer>
          <RichTextPlugin
            contentEditable={<StyledContentEditable />}
            placeholder={<Placeholder>내용을 입력해 주세요.</Placeholder>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </RichTextContainer>

        <MarkdownShortcutPlugin />
        <OnChangePlugin onChange={onChange} />
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
`;

const Placeholder = styled(Text)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;
