package main

import (
	"errors"
	"fmt"
)

func commandExplore(cfg *config, areaName string) error {

	if areaName == "" {
		return errors.New("please provide a location area name to explore")
	}

	fmt.Printf("Exploring %s...\n", areaName)
	pokemonEncounters, err := cfg.pokeapiClient.ExploreLocation(nil, areaName)
	if err != nil {
		return err
	}

	fmt.Println("Found Pokemon:")
	for _, encounter := range pokemonEncounters {
		println(" - " + encounter.Pokemon.Name)
	}
	return nil
}