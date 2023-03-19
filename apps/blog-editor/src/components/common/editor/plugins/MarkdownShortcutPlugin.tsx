import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin as DefaultMarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

export const MarkdownShortcutPlugin = () => {
  return <DefaultMarkdownShortcutPlugin transformers={TRANSFORMERS} />;
};
