import { Button, Flex } from "ui";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <Flex>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        variant="primary"
      >
        B
      </Button>
      <Button size="small" variant="quiet">
        B
      </Button>
    </Flex>
  );
};

export default ToolbarPlugin;
