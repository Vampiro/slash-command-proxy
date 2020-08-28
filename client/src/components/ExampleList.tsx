import { List, ListItem } from "@material-ui/core";
import React from "react";
import examples from "../examples";
import "./CommandTest.scss";

type ExampleListProps = {
  onExampleSelect?: (
    destUrl: string,
    outputTemplate: string,
    args: string
  ) => void;
};

function ExampleList(props: ExampleListProps) {
  const handleExampleClick = (index: number) => {
    if (props.onExampleSelect) {
      props.onExampleSelect(
        examples[index].destUrl,
        examples[index].outputTemplate,
        examples[index].args
      );
    }
  };

  const listItems = examples.map((example, index) => (
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
