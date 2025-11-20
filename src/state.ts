import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\nPokedex > ",
  });

  const commands = getCommands();
  return {
    rl: rl,
    commands: commands,
  };
}
