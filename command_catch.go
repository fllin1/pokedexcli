package main

import (
	"errors"
	"math/rand"
)

func commandCatch(cfg *config, args ...string) error {
	if len(args) != 1 {
		return errors.New("please provide a pokemon name to catch")
	}

	pokemonResp, err := cfg.pokeapiClient.PokemonGet(args[0])
	if err != nil {
		return err
	}
	println("Throwing a Pokeball at " + args[0] + "...")

	proba_catch := 150.0 / (150.0 + float64(3*pokemonResp.BaseExperience))
	rand_val := rand.Float64()
	if rand_val < proba_catch {
		println(pokemonResp.Name + " was caught!")
	} else {
		println(pokemonResp.Name + " escaped!")
	}
	return nil
}
