package main

import (
	"time"

	"github.com/fllin1/pokedexcli/internal/pokeapi"
)

func main() {
	pokeClient := pokeapi.NewClient(5*time.Second, 5*time.Minute)
	cfg := &config{
		caughtPokemons: map[string]pokeapi.RespPokemon{},
		pokeapiClient:  pokeClient,
	}

	startRepl(cfg)
}
