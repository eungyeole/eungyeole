import { Button, Divider, Flex } from "ui";
import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiStrikethrough,
  BiFontColor,
  BiColorFill,
} from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isCodeHighlightNode } from "@lexical/code";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from "@lexical/code";
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { setFloatingElementPosition } from "../utils/setFloatingElementPosition";
import { getDOMRangeRect } from "../utils/getDOMRangeRect";
import { createPortal } from "react-dom";
import { getSelectedNode } from "../utils/getSelectedNode";
import styled from "styled-components";
import { Icon } from "ui";

interface InlineToolbarProps {
  editor: LexicalEditor;
  anchorElement: HTMLElement;
}
const InlineToolbar: FC<InlineToolbarProps> = ({ editor, anchorElement }) => {
  const inlineToolbarRef = useRef<HTMLDivElement | null>(null);

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection();

    const inlineToolbarElement = inlineToolbarRef.current;
    const nativeSelection = window.getSelection();

    if (inlineToolbarElement === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement);

      setFloatingElementPosition(
        rangeRect,
        inlineToolbarElement,
        anchorElement
      );
    }
  }, [editor, anchorElement]);

  useEffect(() => {
    const scrollerElem = anchorElement.parentElement;

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar();
      });
    };

    window.addEventListener("resize", update);
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update);
    }

    return () => {
      window.removeEventListener("resize", update);
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update);
      }
    };
  }, [editor, updateTextFormatFloatingToolbar, anchorElement]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar();
    });
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, updateTextFormatFloatingToolbar]);

  return (
    <Container
      align="center"
      ref={inlineToolbarRef}
      className="floating-text-format-popup"
    >
      <Button
        size="small"
        variant="quiet"
        tailingIcon={
          <Icon color="gray600">
            <RiArrowDropDownFill size={24} />
          </Icon>
        }
      >
        텍스트
      </Button>
      <Divider direction="vertical" />
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        iconOnly={<BiBold size={18} />}
        size="small"
        variant="quiet"
      />
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        iconOnly={<BiItalic size={18} />}
        size="small"
        variant="quiet"
      />
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        iconOnly={<BiUnderline size={18} />}
        size="small"
        variant="quiet"
      />
      <Button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        iconOnly={<BiStrikethrough size={18} />}
        size="small"
        variant="quiet"
      />
      <Divider direction="vertical" />
      <Button
        size="small"
        variant="quiet"
        iconOnly={
          <Icon>
            <BiFontColor size={18} />
          </Icon>
        }
      />
      <Button
        size="small"
        variant="quiet"
        iconOnly={
          <Icon>
            <BiColorFill size={18} />
          </Icon>
        }
      />

      {/* {codeLanguage} */}
    </Container>
  );
};

const Container = styled(Flex)`
  background: #fff;
  padding: 4px;
  vertical-align: middle;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: 0;
  background-color: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  transition: opacity 0.5s;
  height: 36px;
  box-sizing: border-box;
  will-change: transform;
`;

const useFloatingInlineToolbar = (
  editor: LexicalEditor,
  anchorElem: HTMLElement
) => {
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return;
      }
      const selection = $getSelection();
      const nativeSelection = window.getSelection();
      const rootElement = editor.getRootElement();

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false);
        return;
      }

      if (!$isRangeSelection(selection)) {
        return;
      }

      const node = getSelectedNode(selection);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (
        !$isCodeHighlightNode(selection.anchor.getNode()) &&
        selection.getTextContent() !== ""
      ) {
        setIsText($isTextNode(node));
      } else {
        setIsText(false);
      }
    });
  }, [editor]);

  useEffect(() => {
    document.addEventListener("selectionchange", updatePopup);
    return () => {
      document.removeEventListener("selectionchange", updatePopup);
    };
  }, [updatePopup]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup();
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false);
        }
      })
    );
  }, [editor, updatePopup]);

  if (!isText || isLink) {
    return null;
  }

  return createPortal(
    <InlineToolbar editor={editor} anchorElement={anchorElem} />,
    anchorElem
  );
};

function FloatingInlineToolbarPlugin({
  anchorElement = document.body,
}: {
  anchorElement?: HTMLElement;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  return useFloatingInlineToolbar(editor, anchorElement);
}

export default FloatingInlineToolbarPlugin;

// export default InlineToolbar;
