import { cleanInput } from "./repl.js";
import { initState } from "./state.js";

function main() {
  const state = initState();

  console.log("Welcome to the Pokedex!");
  state.rl.prompt();

  state.rl.on("line", async (callback) => {
    const cleanCallback = cleanInput(callback);

    if (cleanCallback.length === 0) {
      state.rl.prompt();
    }

    const mainCommand = cleanCallback[0];
    if (!(mainCommand in state.commands)) {
      console.log("Unknown command");
    }

    if (cleanCallback.length === 1) {
      try {
        await state.commands[mainCommand]["callback"](state);
      } catch (err) {
        if (err instanceof Error) {
          console.log("An EXPECTED error occured: " + err);
        }
      }
    } else if (cleanCallback.length === 2) {
      try {
        const arg = cleanCallback[1];
        await state.commands[mainCommand]["callback"](state, arg);
      } catch (err) {
        if (err instanceof Error) {
          console.log("An EXPECTED error occured: " + err);
        }
      }
    } else {
      console.log("Too many arguments.");
    }
    state.rl.prompt();
  });
}

main();
