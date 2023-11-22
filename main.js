// Import functions from naive.js and shiftAnd.js
const naiv = require('./naiv');
const shiftOr = require('./shiftAnd');
const notSoNaive = require('./notSoNaive');
const KR = require('./rubinKarp');
const boyerMoore = require('./boyerMoore')

function measureMemoryUsage() {
    const used = process.memoryUsage();
    console.log(`Memory Usage: ${JSON.stringify(used)}`);
}

//const fs = require('fs');
//const fileContent = fs.readFileSync('D:\\Balint\\szakdolgozat\\genomic.fna', 'utf8');
const fs = require('fs');
let fileData = ['','','','','','','','',''];
/*
let fileData2 = '';
let fileData3 = '';
let fileData4 = '';
let fileData5 = '';
let fileData6 = '';
let fileData7 = '';
*/

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


    /*
    console.time("shiftOr");
    console.log(shiftOr(P, fileData));
    console.timeEnd("shiftOr");
    */
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









