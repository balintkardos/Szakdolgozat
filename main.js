// Import 
const naiv = require('./naiv');
const query = require('./queryIndex');
const shiftOr = require('./shiftAnd');
const notSoNaive = require('./notSoNaive');
const KR = require('./rubinKarp');
const boyerMoore = require('./boyerMoore');
const kmp= require('./kmp');
const kmpPrefix = require('./kmpPrefix');
const SuffixTree = require('./suffixTree');


const fs = require('fs');
let fileData = [];
const filePath = 'D:\\Balint\\szakdolgozat\\genomic.fna';
const chunkSize = 1024 * 1024; 

const readStream = fs.createReadStream(filePath, { highWaterMark: chunkSize });
let count=0;
readStream.on('data', (chunk) => {
     // Decode each chunk from buffer to string
     const chunkString = chunk.toString('utf-8');
    
     // Concatenate each chunk into the fileData string
     count++
     if(count<512){
        fileData[0] += chunkString
     } else if(count<1023){
        fileData[1] += chunkString
     } else if(count<1534){
        fileData[2] += chunkString
     } else if(count<2044){
        fileData[3] += chunkString
     } else if(count<2554){
        fileData[4] += chunkString
     } else if(count<3064){
        fileData[5] += chunkString
     } else if(count<3583){
        fileData[6] += chunkString
     } 
});

readStream.on('end', () => {
    console.log('Finished reading the file');
    afterRead()
});

readStream.on('error', (err) => {
    console.error(`Error reading the file: ${err}`);
});

// Use the functions
function afterRead(){

    let P="ATATATATATAT";

    //console.log(fileData[0].slice(0,10500));

    //console.log(countCharactersInArray(fileData));

    //const inputString = fileData[0];

    console.time("query");
    const myIndex = new query.Index(fileData[0].slice(0,fileData[0].length/50), 0);
    console.timeEnd("query");
    console.time("querySearch");
    const result = myIndex.query(P);
    console.timeEnd("querySearch");
    console.log(result);




    return 0;
    var suffixTree = new SuffixTree();
    console.log(fileData[0].length/50)
    suffixTree.addString(fileData[0].slice(0,fileData[0].length/50));
    console.log("kész a fa");
    console.time("suffixFaKeresés");
    console.log(suffixTree.search("ATATATATATAT"))
    console.timeEnd("suffixFaKeresés");
    
    console.time("kmp");
    serach(fileData,P,kmp)
    console.timeEnd("kmp");
    console.time("BM");
    serach(fileData,P,boyerMoore)
    console.timeEnd("BM");
    console.time("RK");
    serach(fileData,P,KR)
    console.timeEnd("RK");
    console.time("notSoNaive");
    serach(fileData,P,notSoNaive)
    console.timeEnd("notSoNaive");
    console.time("Naive");
    serach(fileData,P,naiv.naive)
    console.timeEnd("Naive");
    console.time("shiftOr");
    serach(fileData,P ,shiftOr);
    console.timeEnd("shiftOr");
}


function serach(fileData,P,searchAlgorithm){
    let all=[];
    let position=0;
    for(let i in fileData){
        console.log(i, "fajl")
        let sub = searchAlgorithm(P, fileData[i]);
        for(let j of sub){
            all.push(j+position)
        }
        position+=fileData.length;
    }
    console.log(all)
}

function countCharactersInArray(arr) {
    // Create an empty dictionary to store character counts
    let charCount = {};
  
    // Iterate through each string in the array
    arr.forEach((str) => {
      // Iterate through each character in the string
      for (let i = 0; i < str.length; i++) {
        // Get the current character
        let char = str[i];
  
        // Check if the character is already in the dictionary
        if (charCount[char]) {
          // Increment the count if the character is already in the dictionary
          charCount[char]++;
        } else {
          // Add the character to the dictionary with a count of 1 if it's not already present
          charCount[char] = 1;
        }
      }
    });
  
    // Return the dictionary with character counts
    return charCount;
  }









