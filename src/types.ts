export interface CommandCreatorProps {
  destUrl: string;
  onDestUrlChange?: (destUrl: string) => void;
  onOutputTemplateChange?: (outputTemplate: string) => void;
  outputTemplate: string;
}

export interface CommandTestProps {
  args: string;
  destUrl: string;
  onArgsChange?: (args: string) => void;
  outputTemplate: string;
}

export interface Example {
  args: string;
  destUrl: string;
  outputTemplate: string;
  title: string;
}

export interface ExampleListProps {
  examples: Example[];
  onExampleSelect?: (destUrl: string, outputTemplate: string, args: string) => void;
}

export enum Reserved {
  PROXY = "prx",
}
