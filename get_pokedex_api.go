package main

import (
	"io"
	"log"
	"net/http"
)

func getPokedexAPI(url string) ([]byte, error) {
	res, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	body, err := io.ReadAll(res.Body)
	res.Body.Close()
	if res.StatusCode > 299 {
		log.Fatalf("Status code error: %d %s", res.StatusCode, res.Status)
	}
	if err != nil {
		log.Fatal(err)
	}
	return body, nil
}