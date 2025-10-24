package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func startRepl() {
	reader := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print("Pokedex > ")
		reader.Scan()

		words := cleanInput(reader.Text())
		if len(words) == 0 {
			continue
		}

		commandName := words[0]

		command, exists := getCommands()[commandName]
		if exists {
			err := command.callback()
			if err != nil {
				fmt.Println(err)
			}
			continue
		} else {
			fmt.Println("Unknown command")
			continue
		}
	}
}

func cleanInput(text string) []string {
	output := strings.ToLower(text)
	words := strings.Fields(output)
	return words
}

type cliCommandConfig struct {
	Next 		*string
	Previous 	*string
}

type cliCommand struct {
	name        string
	description string
	callback    func() error
	config 		*cliCommandConfig
}


var mapConfig *cliCommandConfig = &cliCommandConfig{Next: nil, Previous: nil}


func getCommands() map[string]cliCommand {
	return map[string]cliCommand{
		"help": {
			name:        "help",
			description: "Displays a help message",
			callback:    commandHelp,
			config: 	 nil,
		},
		"exit": {
			name:        "exit",
			description: "Exit the Pokedex",
			callback:    commandExit,
			config: 	 nil,
		},
		"map": {
			name:        "map",
			description: "Displays the next list of location areas",
			callback:    commandMap,
			config: 	 mapConfig,
		},
		"mapb" : {
			name:        "mapb",
			description: "Displays the previous list of location areas",
			callback:    commandMapB,
			config: 	 mapConfig,
		},
	}
}
