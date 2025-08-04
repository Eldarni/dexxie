#!/usr/bin/env node

//
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
const DB_PATH = path.join(__dirname, 'pokemon.db');

/**
 * Get all Pokemon data from the database
 */
function getPokemonData(db) {
    return new Promise((resolve, reject) => {
        db.all('SELECT p.id, p.number, p.family FROM pokemon p ORDER BY p.number', (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

/**
 * Get names for a specific Pokemon
 */
function getPokemonNames(db, pokemonId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT lang, name FROM name WHERE id = ? ORDER BY lang', [pokemonId], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const names = {};
            rows.forEach(row => {
                names[row.lang] = row.name;
            });
            resolve(names);
        });
    });
}

/**
 * Get tags for a specific Pokemon
 */
function getPokemonTags(db, pokemonId) {
    return new Promise((resolve, reject) => {
        db.all('SELECT tag FROM tag WHERE id = ? ORDER BY tag', [pokemonId], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const tags = rows.map(row => row.tag);
            resolve(tags);
        });
    });
}

/**
 * Export all Pokemon data to JSON format
 */
async function exportData(outputPath = null) {

    //
    console.log('Starting export from database...');

    // Set default output path if not provided
    if (!outputPath) {
        outputPath = path.join(__dirname, 'pokemon_exported.json');
    }

    // Check if database exists
    if (!fs.existsSync(DB_PATH)) {
        console.error(`Error: Database not found: ${DB_PATH}`);
        console.error('Please run the import script first to create the database.');
        process.exit(1);
    }

    // Open database
    const db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
            console.error(`Error opening database: ${err.message}`);
            process.exit(1);
        }
        console.log('Connected to SQLite database');
    });

    try {

        //
        console.log('Fetching Pokemon data...');
        const pokemonRecords = await getPokemonData(db);

        //
        if (pokemonRecords.length === 0) {
            console.log('No Pokemon data found in database.');
            console.log('Please run the import script first to populate the database.');
            return;
        }

        //
        console.log(`Found ${pokemonRecords.length} Pokemon`);

        //
        const pokemonData = [];

        //
        for (const pokemon of pokemonRecords) {

            //
            const names = await getPokemonNames(db, pokemon.id);

            //
            const tags = await getPokemonTags(db, pokemon.id);

            // Build the Pokemon object in the original format
            const pokemonObject = {
                id: pokemon.id,
                number: pokemon.number,
                name: names,
                tags: tags,
                family: pokemon.family
            };

            //
            pokemonData.push(pokemonObject);

        }

        //
        console.log(`Writing data to: ${outputPath}`);
        fs.writeFileSync(outputPath, JSON.stringify(pokemonData, null, 2), 'utf8');

        //
        console.log('Export completed successfully!');

    } catch (error) {
        console.error(`Export failed: ${error.message}`);
        process.exit(1);
    } finally {
        // Close database
        db.close((err) => {
            if (err) {
                console.error(`Error closing database: ${err.message}`);
            } else {
                console.log('Database connection closed');
            }
        });
    }
}

// Main execution
function main() {

    //
    const args = process.argv.slice(2);
    let outputPath = null;

    //
    if (args.length > 0) {
        outputPath = args[0];
    }

    //
    if (args.includes('--help') || args.includes('-h')) {
        console.log('Usage: node export.mjs [output-file]');
        console.log('');
        console.log('Arguments:');
        console.log('  output-file    Path to output JSON file (optional)');
        console.log('                 Default: data/pokemon.json');
        console.log('');
        console.log('Examples:');
        console.log('  node export.mjs');
        console.log('  node export.mjs pokemon.json');
        console.log('  node export.mjs ../output/pokemon.json');
        process.exit(0);
    }

    //
    exportData(outputPath);

}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { exportData };
