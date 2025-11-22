import { z } from "zod";
import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  nextLocationsURL: string | null;
  previousLocationsURL: string | null;
  cache: Cache;

  constructor(interval: number) {
    this.nextLocationsURL = null;
    this.previousLocationsURL = null;
    this.cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if (typeof pageURL !== "string") {
      pageURL = PokeAPI.baseURL + "/location-area";
    }

    const cached = this.cache.get<ShallowLocations>(pageURL);

    let respData: ShallowLocations;

    if (typeof cached === "undefined") {
      const resp = await fetch(pageURL, {
        method: "GET",
      });

      respData = await resp.json();
      if (!ShallowLocationsSchema.safeParse(respData).success) {
        throw new Error("Invalid response data");
      }

      this.cache.add(pageURL, respData);
    } else {
      respData = cached;
    }

    this.nextLocationsURL = respData.next;
    this.previousLocationsURL = respData.previous;

    return respData;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const pageURL = PokeAPI.baseURL + `/location-area/${locationName}`;

    let respData: Location;
    const cached = this.cache.get<Location>(pageURL);

    if (typeof cached === "undefined") {
      const resp = await fetch(pageURL, { method: "GET" });

      respData = await resp.json();
      if (!LocationSchema.safeParse(respData).success) {
        throw new Error("Invalid response data");
      }

      this.cache.add(pageURL, respData);
    } else {
      respData = cached;
    }

    return respData;
  }

  async fetchPokemon(pokemon: string): Promise<Pokemon> {
    const pageURL = PokeAPI.baseURL + `/pokemon/${pokemon}`;

    let respData: Pokemon;
    const cached = this.cache.get<Pokemon>(pageURL);

    if (typeof cached === "undefined") {
      const resp = await fetch(pageURL, { method: "GET" });

      respData = await resp.json();
      if (!PokemonSchema.safeParse(respData).success) {
        throw new Error("Invalid response data");
      }

      this.cache.add(pageURL, respData);
    } else {
      respData = cached;
    }

    return respData;
  }
}

const ShallowLocationsSchema = z.object({
  count: z.number(),
  next: z.string(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    }),
  ),
});
export type ShallowLocations = z.infer<typeof ShallowLocationsSchema>;

export const PokemonEncountersSchema = z.array(
  z.object({
    pokemon: z.object({
      name: z.string(),
      url: z.string(),
    }),
    version_details: z.array(
      z.object({
        encounter_details: z.array(
          z.object({
            chance: z.number(),
            condition_values: z.array(z.any()),
            max_level: z.number(),
            method: z.object({
              name: z.string(),
              url: z.string(),
            }),
            min_level: z.number(),
          }),
        ),
        max_chance: z.number(),
        version: z.object({
          name: z.string(),
          url: z.string(),
        }),
      }),
    ),
  }),
);
export type PokemonEncounters = z.infer<typeof PokemonEncountersSchema>;

export const LocationSchema = z.object({
  encounter_method_rates: z.array(
    z.object({
      encounter_method: z.object({
        name: z.string(),
        url: z.string(),
      }),
      version_details: z.array(
        z.object({
          rate: z.number(),
          version: z.object({
            name: z.string(),
            url: z.string(),
          }),
        }),
      ),
    }),
  ),
  game_index: z.number(),
  id: z.number(),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  name: z.string(),
  names: z.array(
    z.object({
      language: z.object({
        name: z.string(),
        url: z.string(),
      }),
      name: z.string(),
    }),
  ),
  pokemon_encounters: PokemonEncountersSchema,
});
export type Location = z.infer<typeof LocationSchema>;

export const PokemonSchema = z.object({
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string(),
      }),
      is_hidden: z.boolean(),
      slot: z.number(),
    }),
  ),
  base_experience: z.number(),
  cries: z.object({
    latest: z.string(),
    legacy: z.string(),
  }),
  forms: z.array(z.object({ name: z.string(), url: z.string() })),
  game_indices: z.array(
    z.object({
      game_index: z.number(),
      version: z.object({
        name: z.string(),
        url: z.string(),
      }),
    }),
  ),
  height: z.number(),
  held_items: z.any(),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string(),
  moves: z.any(),
  name: z.string(),
  order: z.number(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;
