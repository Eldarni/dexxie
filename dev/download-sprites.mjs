
//
import fs from 'fs';
import sharp from 'sharp';
import AdmZip from 'adm-zip';

//download the sprites from github
const response = await fetch('https://codeload.github.com/PokeAPI/sprites/zip/master');
const buffer = Buffer.from(await response.arrayBuffer());

//
fs.writeFileSync('./sprites.zip', buffer);

//open the zip file
const zip = new AdmZip('./sprites.zip');

//
zip.getEntries().forEach(function(entry) {

    //see if the sprite path and filename matches our desired icon
    const matches = entry.entryName.match(/sprites-master\/sprites\/pokemon\/other\/home\/(?:(shiny)\/)?([0-9]+).png/);

    //extract the sprite, and convert it to webp and put it into the public/icons folder
    if (matches !== null) {
        sharp(entry.getData()).resize(256, 256).webp().toFile(`../public/icons/${matches[2]}${((matches[1] == 'shiny') ? '-shiny' : '')}.webp`);
    }

});

//
fs.unlink('./sprites.zip');
