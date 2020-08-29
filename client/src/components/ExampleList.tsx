import { List, ListItem } from "@material-ui/core";
import React from "react";
import "./CommandTest.scss";

function ExampleList(props: ExampleListProps) {
  const handleExampleClick = (index: number) => {
    if (props.onExampleSelect) {
      props.onExampleSelect(
        props.examples[index].destUrl,
        props.examples[index].outputTemplate,
        props.examples[index].args
      );
    }
  };

  const listItems = props.examples.map((example, index) => (
    <ListItem
      button
      key={example.title}
      onClick={() => {
        handleExampleClick(index);
      }}
    >
      {example.title}
    </ListItem>
  ));

  return <List>{listItems}</List>;
}

export default ExampleList;
