import { Grid } from "@material-ui/core";
import React from "react";
import raw from "raw.macro";
import marked from "marked";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import plaintext from "highlight.js/lib/languages/plaintext";
import "github-markdown-css";
import "highlight.js/styles/github.css";
import "./UserDocsPage.scss";

// languages that highlight.js can highlight in the markdown
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("plaintext", plaintext);

// code block syntax highlighting with highlight.js
marked.setOptions({
  highlight: function (code, language) {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
});

// get the raw text of UserDocs.md, convert it to html with marked
const docHtml = marked(raw("./UserDocs.md"));

function UserDocsPage() {
  return (
    <Grid className="UserDocsPage" container justify="center">
      <Grid item xs={12} md={11} lg={7}>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: docHtml }}></div>
      </Grid>
    </Grid>
  );
}

export default UserDocsPage;
