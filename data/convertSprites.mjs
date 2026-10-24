#!/usr/bin/env node

//
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//the original sprites (not committed), and where the app loads them from
const SOURCE_DIR = path.join(__dirname, 'sprites');
const SHINY_DIR = path.join(SOURCE_DIR, 'shiny');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'sprites');

//which source sprite each output sprite is made from, keyed by output name
const MAPPING_PATH = path.join(__dirname, 'sprite-mapping.json');

//
const SIZE = 128;
const QUALITY = 80;

/**
 * Resize a sprite to fit a transparent SIZE x SIZE square and save it as webp
 */
async function convertSprite(input, output) {
    await sharp(input)
        .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: QUALITY, alphaQuality: 100 })
        .toFile(output);
}

/**
 * Load the sprite mapping, exiting if it is missing or not valid json
 */
function loadMapping() {

    //
    if (!fs.existsSync(MAPPING_PATH)) {
        console.error(`No sprite mapping found, expected it at ${MAPPING_PATH}`);
        process.exit(1);
    }

    //
    try {
        return JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8'));
    } catch (error) {
        console.error(`Invalid sprite mapping ${MAPPING_PATH}: ${error.message}`);
        process.exit(1);
    }

}

/**
 * Main function
 */
async function main() {

    //
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`No sprites found, expected them in ${SOURCE_DIR}`);
        process.exit(1);
    }

    //
    const mapping = loadMapping();

    //start from empty so renamed or removed sprites leave nothing behind
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    fs.mkdirSync(path.join(OUTPUT_DIR, 'shiny'), { recursive: true });

    //
    let converted = 0;
    let totalBytes = 0;
    const missing = [];
    const failed = [];

    //
    for (const [ key, stem ] of Object.entries(mapping)) {

        //
        if (typeof stem !== 'string') {
            missing.push(`${key}: invalid source sprite ${JSON.stringify(stem)}, expected a string`);
            continue;
        }

        //
        const jobs = [
            [ path.join(SOURCE_DIR, `${stem}.png`), path.join(OUTPUT_DIR, `${key}.webp`) ],
            [ path.join(SHINY_DIR, `${stem}.png`), path.join(OUTPUT_DIR, 'shiny', `${key}.webp`) ],
        ];

        //
        for (const [ input, output ] of jobs) {

            //
            if (!fs.existsSync(input)) {
                missing.push(`${key}: no source sprite ${path.relative(SOURCE_DIR, input)}`);
                continue;
            }

            //
            try {
                await convertSprite(input, output);
                totalBytes += fs.statSync(output).size;
                converted++;
            } catch (error) {
                failed.push(`${path.relative(SOURCE_DIR, input)}: ${error.message}`);
            }

        }

    }

    //
    console.log(`Converted ${converted} sprites for ${Object.keys(mapping).length} pokemon to ${SIZE}x${SIZE} webp (${(totalBytes / 1024 / 1024).toFixed(1)} MB total)`);

    //
    if (missing.length > 0) {
        console.error(`Missing ${missing.length} source sprites:\n${missing.join('\n')}`);
    }

    //
    if (failed.length > 0) {
        console.error(`Failed to convert ${failed.length} sprites:\n${failed.join('\n')}`);
    }

}

//
main();
