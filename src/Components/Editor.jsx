import React from "react";
import ReactMde from "react-mde";

import "react-mde/lib/styles/css/react-mde-all.css";
import Showdown from "showdown";
function Editor(props) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });
  return (
    <section className="pane editor">
      <ReactMde
        value={props.currentNote.text}
        onChange={props.updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}

export default Editor;

