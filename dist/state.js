import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
export function initState() {
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
