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
        map: {
            name: "map",
            description: "Shows location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Shows the previous page of location areas",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Shows the pokemons on the location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Try to catch a pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspect a caught pokemon",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Show off your pokedex",
            callback: commandPokedex,
        },
    };
}
export async function commandExit(state) {
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}
export async function commandHelp(state) {
    console.log("Usage:");
    console.log();
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
export async function commandMap(state) {
    if (typeof state.pokeapi.nextLocationsURL === "string") {
        const locations = await state.pokeapi.fetchLocations(state.pokeapi.nextLocationsURL);
        printLocations(locations);
        return;
    }
    const locations = await state.pokeapi.fetchLocations();
    printLocations(locations);
}
export async function commandMapb(state) {
    if (typeof state.pokeapi.previousLocationsURL === "string") {
        const locations = await state.pokeapi.fetchLocations(state.pokeapi.previousLocationsURL);
        printLocations(locations);
    }
    else {
        console.log("You're on the first page");
    }
}
export async function commandExplore(state, location) {
    console.log(`Exploring ${location}`);
    console.log("Found Pokemon:");
    const locationData = await state.pokeapi.fetchLocation(location);
    const pokemons = locationData.pokemon_encounters;
    for (const pokemonData of pokemons) {
        console.log(` - ${pokemonData.pokemon.name}`);
    }
}
export async function commandCatch(state, pokemon) {
    console.log(`Throwing a Pokeball at ${pokemon}...`);
    const podekmonData = await state.pokeapi.fetchPokemon(pokemon);
    const baseExperience = podekmonData.base_experience;
    const probaCatch = Math.min(100 / (baseExperience + 100), 0.8);
    const catchSuccess = Math.random() > probaCatch;
    if (catchSuccess) {
        state.pokedex[pokemon] = podekmonData;
        console.log(`${pokemon} was caught`);
    }
    else {
        console.log(`${pokemon} escaped`);
    }
}
export async function commandInspect(state, pokemon) {
    if (pokemon in state.pokedex) {
        console.log(`Name: ${state.pokedex[pokemon].name}`);
        console.log(`Height: ${state.pokedex[pokemon].height}`);
    }
    else {
        console.log("you have not caught that pokemon");
    }
}
export async function commandPokedex(state) {
    console.log("Your pokedex:");
    for (const pokemon in state.pokedex) {
        console.log(` - ${pokemon}`);
    }
}
function printLocations(locations) {
    for (const location of locations.results) {
        console.log(location.name);
    }
}
