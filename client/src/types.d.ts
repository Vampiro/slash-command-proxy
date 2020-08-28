type CommandCreatorProps = {
  onOutputTemplateChange?: (outputTemplate: string) => void;
  onDestUrlChange?: (destUrl: string) => void;
  outputTemplate: string;
  destUrl: string;
};

type CommandTestProps = {
  args: string;
  onArgsChange?: (args: string) => void;
  outputTemplate: string;
  destUrl: string;
};

type ExampleListProps = {
  onExampleSelect?: (
    destUrl: string,
    outputTemplate: string,
    args: string
  ) => void;
};
