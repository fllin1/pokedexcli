package main

import (
	"encoding/json"
	"fmt"
	"log"
)

type LocationArea struct {
	Count 		int `json:"count"`
	Next  		*string `json:"next"`
	Previous 	*string `json:"previous"`
	Results 	[]struct {
		Name 		string `json:"name"`
		URL  		string `json:"url"`
	} `json:"results"`
}


func commandMap() error {
	var url string
		fmt.Println()
	if mapConfig.Next == nil {
		url = "https://pokeapi.co/api/v2/location-area/"
		fmt.Println("Fetching first page of location areas...")
	} else {
		url = *mapConfig.Next
		fmt.Println("Fetching next page of location areas...")
	}

	body, err := getPokedexAPI(url)
	if err != nil {
		log.Fatal(err)
	}

	var locationArea LocationArea
	err = json.Unmarshal(body, &locationArea)
	if err != nil {
		log.Fatal(err)
	}

	// Update next and previous in command config
	mapConfig.Next = locationArea.Next
	mapConfig.Previous = locationArea.Previous
	
	printLocationAreas(locationArea)
	return nil
}


func commandMapB() error {
	var url string
	if mapConfig.Previous == nil {
		fmt.Println("No previous page available.")
		return nil
	} else {
		fmt.Println("Fetching previous page of location areas...")
		url = *mapConfig.Previous
	}
	body, err := getPokedexAPI(url)
	if err != nil {
		log.Fatal(err)
	}

	var locationArea LocationArea
	err = json.Unmarshal(body, &locationArea)
	if err != nil {
		log.Fatal(err)
	}
	
	// Update next and previous in command config
	mapConfig.Next = locationArea.Next
	mapConfig.Previous = locationArea.Previous
	
	printLocationAreas(locationArea)
	return nil
}

func printLocationAreas(locationArea LocationArea) {
	for _, area := range locationArea.Results {
		fmt.Printf("- %s\n", area.Name)
	}
	fmt.Println()
}