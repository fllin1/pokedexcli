package main

import (
	"errors"
	"fmt"

	"github.com/fllin1/pokedexcli/internal/pokeapi"
)

func commandInspect(cfg *config, args ...string) error {
	if len(args) < 1 {
		return errors.New("Please provide a pokemon name")
	}
	pokemonName := args[0]
	if pokemon, exists := cfg.caughtPokemons[pokemonName]; exists {
		printPokemonDetails(pokemon)
		return nil
	}
	return errors.New("you have not caught this pokemon")
}

func printPokemonDetails(pokemonResp pokeapi.RespPokemon) {
	fmt.Printf("Name: %s\n", pokemonResp.Name)
	fmt.Printf("Height: %d\n", pokemonResp.Height)
	fmt.Printf("Weight: %d\n", pokemonResp.Weight)
	fmt.Printf("Stats:\n")
	for _, stat := range pokemonResp.Stats {
		fmt.Printf("  -%s: %d\n", stat.Stat.Name, stat.BaseStat)
	}
	fmt.Printf("Types:\n")
	for _, t := range pokemonResp.Types {
		fmt.Printf("  - %s\n", t.Type.Name)
	}
}
