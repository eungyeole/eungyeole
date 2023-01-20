import { Post } from "database";
import { SerializedEditorState } from "lexical";
import { useState } from "react";
import { Button } from "ui";
import Editor from "../components/Editor/Editor";

const EditorPage = () => {
  const [editorState, setEditorState] = useState<SerializedEditorState>();
  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
      }}
    >
      <Button
        onClick={() => {
          fetch("/api/post/temp", {
            method: "POST",
            body: JSON.stringify({
              id: "63caadff61f517299ea5ea78",
              title: "이것은 임시저장된 글이다.",
              content: JSON.parse(JSON.stringify(editorState)),
              description: "이것은 임시저장된 글이다.",
              categories: ["개발"],
              thumbnailUrl: "",
            }),
          });
        }}
      >
        임시 저장
      </Button>
      <Editor onChange={(editor) => setEditorState(editor.toJSON())}></Editor>
    </div>
  );
};

export default EditorPage;
