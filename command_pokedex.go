package main

import (
	"errors"
	"fmt"
)

func commandPokedex(cfg *config, args ...string) error {
	if len(cfg.caughtPokemons) == 0 {
		return errors.New("You have not caught any pokemons yet")
	}

	for name := range cfg.caughtPokemons {
		fmt.Println("  - " + name)
	}
	return nil
}
