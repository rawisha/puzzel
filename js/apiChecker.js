const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export default async function wordCheck(word){
    word = word.join('').toLowerCase();
    const res = await fetch(URL + word)
    console.log(res);
    if(res.ok === false){
        return false
    }else {
        return true
    }

   

}

/*
err data

{title: 'No Definitions Found',
 message: "Sorry pal, we couldn't find definitions for the word you were looking for.", 
 resolution: 'You can try the search again at later time or head to the web instead.'}



valid data

0:
license: {name: 'CC BY-SA 3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0'}
meanings: (2) [{…}, {…}]
phonetic: "/foː/"
phonetics: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
sourceUrls: ['https://en.wiktionary.org/wiki/four']
word: "four"


*/