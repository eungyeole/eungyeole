/**
 * AddBlockButton is a plugin that adds a + button to the left side of the block in the editor.
 * When hover over or click the button to the anchor, it will show a button with a plus sign.
 * When clicked, it will open a Button with a list of blocks that can be added to the editor.
 * The Button will be anchored to the left side of the block and be positioned below or above the block depending on the available space.
 * The Button will be closed when the user clicks outside of the Button.
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { eventFiles } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import {
  $getNearestNodeFromDOMNode,
  $getNodeByKey,
  $getRoot,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  INSERT_PARAGRAPH_COMMAND,
  $createParagraphNode,
  LexicalEditor,
  $createTextNode,
  $createNodeSelection,
  $setSelection,
} from "lexical";
import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";

import { createPortal } from "react-dom";
import styled from "styled-components";
import { Button } from "ui";

import { Rect, Point } from "./shape";

const SPACE = 4;
const TARGET_LINE_HALF_HEIGHT = 1.5;
const ADD_BLOCK_BUTTON_CLASS_NAME = "add-block-button";
const ADD_BLOCK_DATA_FORMAT = "application/x-lexical-add-block";
const TEXT_BOX_HORIZONTAL_PADDING = 28;

const Downward = 1;
const Upward = -1;
const Indeterminate = 0;

let prevIndex = Infinity;

function isHTMLElement(elem: EventTarget | null): elem is HTMLElement {
  return elem instanceof HTMLElement;
}

function getCurrentIndex(keysLength: number): number {
  if (keysLength === 0) {
    return Infinity;
  }
  if (prevIndex >= 0 && prevIndex < keysLength) {
    return prevIndex;
  }

  return Math.floor(keysLength / 2);
}

function getTopLevelNodeKeys(editor: LexicalEditor): string[] {
  return editor.getEditorState().read(() => $getRoot().getChildrenKeys());
}

function getBlockElement(
  anchorElem: HTMLElement,
  editor: LexicalEditor,
  event: MouseEvent
): HTMLElement | null {
  const anchorElementRect = anchorElem.getBoundingClientRect();
  const topLevelNodeKeys = getTopLevelNodeKeys(editor);

  let blockElem: HTMLElement | null = null;

  editor.getEditorState().read(() => {
    let index = getCurrentIndex(topLevelNodeKeys.length);
    let direction = Indeterminate;

    while (index >= 0 && index < topLevelNodeKeys.length) {
      const key = topLevelNodeKeys[index];
      const elem = editor.getElementByKey(key);
      if (elem === null) {
        break;
      }
      const point = new Point(event.x, event.y);
      const domRect = Rect.fromDOM(elem);
      const { marginTop, marginBottom } = window.getComputedStyle(elem);

      const rect = domRect.generateNewRect({
        bottom: domRect.bottom + parseFloat(marginBottom),
        left: anchorElementRect.left,
        right: anchorElementRect.right,
        top: domRect.top - parseFloat(marginTop),
      });

      const {
        result,
        reason: { isOnTopSide, isOnBottomSide },
      } = rect.contains(point);

      if (result) {
        blockElem = elem;
        prevIndex = index;
        break;
      }

      if (direction === Indeterminate) {
        if (isOnTopSide) {
          direction = Upward;
        } else if (isOnBottomSide) {
          direction = Downward;
        } else {
          // stop search block element
          direction = Infinity;
        }
      }

      index += direction;
    }
  });

  return blockElem;
}

function isOnButton(element: HTMLElement): boolean {
  return !!element.closest(`.${ADD_BLOCK_BUTTON_CLASS_NAME}`);
}

function setButtonPosition(
  targetElem: HTMLElement | null,
  floatingElem: HTMLElement,
  anchorElem: HTMLElement
) {
  if (!targetElem) {
    floatingElem.style.opacity = "0";
    floatingElem.style.transform = "translate(-10000px, -10000px)";
    return;
  }

  const targetRect = targetElem.getBoundingClientRect();
  const targetStyle = window.getComputedStyle(targetElem);
  const floatingElemRect = floatingElem.getBoundingClientRect();
  const anchorElementRect = anchorElem.getBoundingClientRect();

  const top =
    targetRect.top +
    (parseInt(targetStyle.lineHeight, 10) - floatingElemRect.height) / 2 -
    anchorElementRect.top;

  const left = SPACE;

  floatingElem.style.opacity = "1";
  floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}

function setTargetLine(
  targetLineElem: HTMLElement,
  targetBlockElem: HTMLElement,
  mouseY: number,
  anchorElem: HTMLElement
) {
  const targetStyle = window.getComputedStyle(targetBlockElem);
  const { top: targetBlockElemTop, height: targetBlockElemHeight } =
    targetBlockElem.getBoundingClientRect();
  const { top: anchorTop, width: anchorWidth } =
    anchorElem.getBoundingClientRect();

  let lineTop = targetBlockElemTop;
  // At the bottom of the target
  if (mouseY - targetBlockElemTop > targetBlockElemHeight / 2) {
    lineTop += targetBlockElemHeight + parseFloat(targetStyle.marginBottom);
  } else {
    lineTop -= parseFloat(targetStyle.marginTop);
  }

  const top = lineTop - anchorTop - TARGET_LINE_HALF_HEIGHT;
  const left = TEXT_BOX_HORIZONTAL_PADDING - SPACE;

  targetLineElem.style.transform = `translate(${left}px, ${top}px)`;
  targetLineElem.style.width = `${
    anchorWidth - (TEXT_BOX_HORIZONTAL_PADDING - SPACE) * 2
  }px`;
  targetLineElem.style.opacity = ".4";
}

function hideTargetLine(targetLineElem: HTMLElement | null) {
  if (targetLineElem) {
    targetLineElem.style.opacity = "0";
    targetLineElem.style.transform = "translate(-10000px, -10000px)";
  }
}

function useAddBlockButton(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
  isEditable: boolean
): JSX.Element {
  const scrollerElem = anchorElem.parentElement;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const targetLineRef = useRef<HTMLDivElement>(null);
  const [targetBlockElem, setTargetBlockElem] = useState<HTMLElement | null>(
    null
  );

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const target = event.target;
      if (!isHTMLElement(target)) {
        setTargetBlockElem(null);
        return;
      }

      if (isOnButton(target)) {
        return;
      }

      const _targetElem = getBlockElement(anchorElem, editor, event);
      setTargetBlockElem(_targetElem);
    },
    [anchorElem, editor]
  );

  const onMouseLeave = useCallback(() => {
    setTargetBlockElem(null);
    hideTargetLine(targetLineRef.current);
  }, []);

  const onClick = useCallback(
    (event: MouseEvent) => {
      const targetElem = getBlockElement(anchorElem, editor, event);
      if (targetElem) {
        const { top } = targetElem.getBoundingClientRect();
        const { top: anchorTop } = anchorElem.getBoundingClientRect();
        const { scrollTop } = scrollerElem!;
        const { lineHeight } = window.getComputedStyle(targetElem);
        const offset = top - anchorTop - parseInt(lineHeight, 10) / 2;
        scrollerElem!.scrollTop = scrollTop + offset;
      }
    },
    [anchorElem, editor, scrollerElem]
  );

  const buttonOnClick = useCallback(() => {
    let nodeKey = "";
    editor.update(() => {
      if (targetBlockElem) {
        const node = $getNearestNodeFromDOMNode(targetBlockElem);
        if (node) {
          nodeKey = node.getKey();
          let paragraphNode = node;
          if (node.getTextContentSize() > 0) {
            paragraphNode = node.insertAfter($createParagraphNode(), false);
            const nodeSelection = $createNodeSelection();
            nodeSelection.add(nodeKey);
            $setSelection(nodeSelection);
            console.log(
              "paragraphNode",
              paragraphNode,
              node,
              nodeKey,
              nodeSelection
            );
          }
          // modal open beside the block
          const { top, left } = targetBlockElem.getBoundingClientRect();
          const { top: anchorTop, left: anchorLeft } =
            anchorElem.getBoundingClientRect();
          const { scrollTop } = scrollerElem!;
          const { lineHeight } = window.getComputedStyle(targetBlockElem);
          const offset = top - anchorTop - parseInt(lineHeight, 10) / 2;
          scrollerElem!.scrollTop = scrollTop + offset;
          // modal open beside the block
          const modalTop = top - anchorTop;
          const modalLeft = left - anchorLeft;
          const modalPosition = { top: modalTop, left: modalLeft };
          console.log("modalPosition", modalPosition);
        }
      }
    });
  }, [editor, targetBlockElem]);

  useEffect(() => {
    scrollerElem!.addEventListener("mousemove", onMouseMove);
    scrollerElem!.addEventListener("mouseleave", onMouseLeave);
    scrollerElem!.addEventListener("click", onClick);

    return () => {
      scrollerElem!.removeEventListener("mousemove", onMouseMove);
      scrollerElem!.removeEventListener("mouseleave", onMouseLeave);
      scrollerElem!.removeEventListener("click", onClick);
    };
  }, [scrollerElem, onMouseMove, onMouseLeave, onClick]);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonPosition(targetBlockElem, buttonRef.current, anchorElem);
    }
  }, [anchorElem, targetBlockElem]);

  return createPortal(
    <>
      <AddBlockButtonStyled
        size="xsmall"
        variant="quiet"
        className={ADD_BLOCK_BUTTON_CLASS_NAME}
        ref={buttonRef}
        onClick={buttonOnClick}
        iconOnly={<BiPlus />}
      />
      <AddBlockTargetLineStyled
        className="add-block-target-line"
        ref={targetLineRef}
      />
    </>,
    anchorElem
  );
}

const AddBlockButtonStyled = styled(Button)`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  left: -${SPACE * 4.5}px;
  top: 0;
  will-change: transform;

  transition: background-color 300ms;

  & svg {
    pointer-events: none;
    fill: ${({ theme }) => theme.colors.gray600};
  }

  &:hover {
    background-color: #e6e6e6;
  }
`;

const AddBlockTargetLineStyled = styled.div`
  pointer-events: none;
  background: deepskyblue;
  height: 4px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  will-change: transform;
`;
export default function AddBlockButtonPlugin({
  anchorElement = document.body,
}: {
  anchorElement?: HTMLElement;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return useAddBlockButton(editor, anchorElement, editor._editable);
}
