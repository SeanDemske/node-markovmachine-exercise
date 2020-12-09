/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov');
const fs = require('fs');
const axios = require('axios');
const process = require('process');

function generateText(text) {
    console.log(new MarkovMachine(text).makeText());
    return new MarkovMachine(text).makeText()
}

function textFromFile(path) {
    fs.readFile(path, 'utf8', function cb(err, data) {
        if (err) {
            console.error("Cannot read file")
            process.exit(1);
        } else {
            generateText(data);
        }
    })
}

async function textFromURL(url) {
    let resp;

    try {
        resp = await axios.get(url);
    } catch(err) {
        console.error("Cannot read URL");
        process.exit(1);
    }
    generateText(resp.data);
}




const method = process.argv[2];
const path = process.argv[3];

if (method === "file") {
    textFromFile(path);
} 
else if (method === "url") {
    textFromURL(path);
} 
else {
    console.error("Invalid method");
    process.exit(1);
}