# Dexxie

Dexxie is a tag based, searchable pokedex for tracking things like shiny dex completion.

## Running locally
```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

## Sources
The Pokémon data comes from the [PokeAPI api-data repository](https://github.com/PokeAPI/api-data).

The Pokémon images are the official artwork (`sprites/pokemon/other/official-artwork`) from the
[PokeAPI sprites repository](https://github.com/PokeAPI/sprites/releases/tag/latest).

The Pokémon GO tags are based on:
- Availability: [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_availability_(GO))
- Shiny releases: [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/List_of_Shiny_Pok%C3%A9mon_in_Pok%C3%A9mon_GO) and the
  [Pokémon GO Wiki](https://pokemongo.fandom.com/wiki/List_of_Shiny_Pok%C3%A9mon_release_dates)
- Regional exclusives: [Serebii](https://serebii.net/pokemongo/exclusives.shtml) and the
  [Pokémon GO Wiki](https://pokemongo.fandom.com/wiki/Region-exclusive_Pok%C3%A9mon)

Pokémon and all related names and images are © Nintendo, Game Freak, Creatures Inc. and The Pokémon Company. Dexxie is
an unofficial fan project and isn't affiliated with or endorsed by any of them.
