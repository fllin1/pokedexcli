import { CLICommand, State } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}

export function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}

export function commandHelp(state: State) {
  console.log("Usage:");
  console.log();
  for (const command of Object.values(state.commands)) {
    console.log(`${command.name}: ${command.description}`);
  }
}
