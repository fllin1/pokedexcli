package pokeapi

import (
	"encoding/json"
	"io"
	"net/http"
)


func (c *Client) ExploreLocation(pageURL *string, areaName string) (PokemonEncounters, error) {
	url := baseURL + "/location-area/" + areaName + "/"
	if pageURL != nil {
		url = *pageURL
	}

	if dat, ok := c.cache.Get(url); ok {
		locationAreaResp := RespLocationArea{}
		err := json.Unmarshal(dat, &locationAreaResp)
		if err != nil {
			return PokemonEncounters{}, err
		}
		return locationAreaResp.PokemonEncounters, nil
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return PokemonEncounters{}, err
	}

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return PokemonEncounters{}, err
	}
	defer resp.Body.Close()

	dat, err := io.ReadAll(resp.Body)
	if err != nil {
		return PokemonEncounters{}, err
	}

	locationAreaResp := RespLocationArea{}
	err = json.Unmarshal(dat, &locationAreaResp)
	if err != nil {
		return PokemonEncounters{}, err
	}

	c.cache.Add(url, dat)
	return locationAreaResp.PokemonEncounters, nil
}