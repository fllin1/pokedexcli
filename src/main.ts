import { cleanInput } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState();

  console.log("Welcome to the Pokedex!");
  state.rl.prompt();

  state.rl.on("line", (callback) => {
    const cleanCallback = cleanInput(callback);

    if (cleanCallback.length === 0) {
      state.rl.prompt();
      return;
    }

    const mainCommand = cleanCallback[0];

    if (cleanCallback.length === 1 && mainCommand in state.commands) {
      state.commands[mainCommand]["callback"](state);
    } else {
      console.log("Unknown command");
    }
    state.rl.prompt();
  });
}

main();
