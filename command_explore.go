package main

import (
	"errors"
	"fmt"
)

func commandExplore(cfg *config, args ...string) error {

	if len(args) != 1 {
		return errors.New("please provide a location area name to explore")
	}

	fmt.Printf("Exploring %s...\n", args[0])
	pokemonEncounters, err := cfg.pokeapiClient.LocationGet(args[0])
	if err != nil {
		return err
	}

	fmt.Println("Found Pokemon:")
	for _, encounter := range pokemonEncounters {
		println(" - " + encounter.Pokemon.Name)
	}
	return nil
}