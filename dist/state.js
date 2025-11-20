import { createInterface } from "readline";
import { getCommands } from "./commands.js";
export function initState() {
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
