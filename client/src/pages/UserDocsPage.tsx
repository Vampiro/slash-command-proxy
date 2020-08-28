import { Grid } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import UserDocsMd from "../UserDocs.md";
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

function UserDocsPage() {
  const [docHtml, setDocHtml] = useState("");

  useEffect(() => {
    document.title = "Documentation";

    // fetch UserDocs.md once when this component first loads
    const fetchMarkdown = async () => {
      try {
        const response = await Axios.get(UserDocsMd);
        // convert markdown to html with marked.js
        const html = marked(response.data);
        setDocHtml(html);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarkdown();
  }, []);

  return (
    <Grid className="UserDocsPage" container justify="center">
      <Grid item xs={12} md={11} lg={7}>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: docHtml }}
        ></div>
      </Grid>
    </Grid>
  );
}

export default UserDocsPage;
