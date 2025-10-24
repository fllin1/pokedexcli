package main

import (
	"time"

	"github.com/fllin1/pokedexcli/internal/pokeapi"
	"github.com/fllin1/pokedexcli/internal/pokecache"
)

func main() {
	pokeClient := pokeapi.NewClient(5 * time.Second)
	cache := pokecache.NewCache(5 * time.Second)
	cfg := &config{
		pokeapiClient: pokeClient,
		cache:		   cache,
	}

	startRepl(cfg)
}
