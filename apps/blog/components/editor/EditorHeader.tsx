import { FC, ReactNode } from "react";
import { Button, Flex } from "ui";
import BaseHeader from "../common/Header/BaseHeader";

interface EditorHeaderProps {
  renderWriteButton?: ReactNode;
}

const EditorHeader: FC<EditorHeaderProps> = ({ renderWriteButton }) => {
  return <BaseHeader rightContent={<Flex>{renderWriteButton}</Flex>} />;
};

export default EditorHeader;
