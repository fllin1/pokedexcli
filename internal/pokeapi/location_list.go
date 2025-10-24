package pokeapi

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/fllin1/pokedexcli/internal/pokecache"
)

// ListLocations -
func (c *Client) ListLocations(pageURL *string, cache *pokecache.Cache) (RespShallowLocations, error) {
	url := baseURL + "/location-area?offset=0&limit=20"
	if pageURL != nil {
		url = *pageURL
	}

	var dat []byte

	if data, exists := cache.Get(url); exists {
		fmt.Println("Cache hit for URL:", url)
		dat = data
	} else {
		fmt.Println("Cache miss for URL:", url)
		req, err := http.NewRequest("GET", url, nil)
		if err != nil {
			return RespShallowLocations{}, err
		}

		resp, err := c.httpClient.Do(req)
		if err != nil {
			return RespShallowLocations{}, err
		}
		defer resp.Body.Close()

		dat, err = io.ReadAll(resp.Body)
		if err != nil {
			return RespShallowLocations{}, err
		}

		cache.Add(url, dat)
	}

	locationsResp := RespShallowLocations{}
	err := json.Unmarshal(dat, &locationsResp)
	if err != nil {
		return RespShallowLocations{}, err
	}

	return locationsResp, nil
}
