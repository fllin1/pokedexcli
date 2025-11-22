import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  pokedex: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => void;
};

export function initState(): State {
  /**
   * Initialize the State of the Pokedex
   */

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\nPokedex > ",
  });

  const commands = getCommands();
  const pokeapi = new PokeAPI(600_000);

  return {
    rl: rl,
    commands: commands,
    pokeapi: pokeapi,
    pokedex: {},
  };
}
