const synonyms = require('synonyms');

const [, , iconName] = process.argv;

const results = synonyms(iconName);

const value = results?.v ?? results?.n;

console.log(JSON.stringify([value]));
