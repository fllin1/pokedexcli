export function getCommands() {
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
export function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}
export function commandHelp(state) {
    console.log("Usage:");
    console.log();
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
