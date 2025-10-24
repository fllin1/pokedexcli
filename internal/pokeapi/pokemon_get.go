package pokeapi

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

func (c *Client) PokemonGet(args ...string) (RespPokemon, error) {
	url := baseURL + "/pokemon/" + args[0] + "/"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return RespPokemon{}, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return RespPokemon{}, err
	}
	defer resp.Body.Close()

	dat, err := io.ReadAll(resp.Body)
	if err != nil {
		return RespPokemon{}, err
	}

	pokemonResp := RespPokemon{}
	err = json.Unmarshal(dat, &pokemonResp)
	if err != nil {
		return RespPokemon{}, errors.New("Does this pokemon even exit ? Error: " + err.Error())
	}

	c.cache.Add(url, dat)
	return pokemonResp, nil
}
