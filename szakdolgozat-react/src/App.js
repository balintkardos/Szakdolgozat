
import OutputArea from './OutputArea';
import React, { useState } from 'react';
const naiv = require('./alg/naiv');
const notSoNaive = require('./alg/notSoNaive');
const bm=require('./alg/boyerMoore');
const kmp=require('./alg/kmp');
const shiftOr=require('./alg/shiftOr');
const kr=require('./alg/KarpRabin');

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(-1);
  const [description, setDescription] = useState("Ez a naive algoritmus");
  const [textInput, setTextInput] = useState('');
  const [patternInput, setPatternInput] = useState('');
  const [hibaInput, setHibaInput] = useState('');
  const [timerSearch, setTimerSearch] = useState(0);
  const [timerPre, setTimerPre] = useState(0);
  const [output, setOutput] = useState([]);

  const handleSearchClick = () => {
    if(textInput === ''){
      alert('Szöveg mező nem lehet üres!');
      return 0;
    }
    if(patternInput === ''){
      alert('Minta mező nem lehet üres!');
      return 0;
    }
    if(selectedAlgorithm===0){
      //Naiv algoritmus
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(naiv.naive(patternInput,textInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    }else if(selectedAlgorithm===2){
      //Boyer-Moore algoritmus
      const startPre = performance.now();
      let bcTable=bm.bad_character_table(patternInput);
      let gsTable=bm.good_suffix_table(patternInput);
      let fsTable=bm.full_shift_table(patternInput);
      const endPre = performance.now();
      setTimerPre(endPre-startPre);
      const startTime = performance.now();
      setOutput(bm.boyerMoore(patternInput,textInput,bcTable,gsTable,fsTable));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));
    }else if(selectedAlgorithm===4){
      //KMP algoritmus
      const startPre = performance.now();
      let preTable=kmp.kmpPrefix(patternInput)
      const endPre = performance.now();
      setTimerPre(endPre-startPre);
      const startTime = performance.now();
      setOutput(kmp.kmp(patternInput,textInput,preTable));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    }else if(selectedAlgorithm===1){
      //Not so Naiv algoritmus
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(notSoNaive(patternInput,textInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    }else if(selectedAlgorithm===10){
      //Naiv Hibával algoritmus
      if(patternInput === ''){
        alert('Hiba mező nem lehet üres!');
        return 0;
      }
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(naiv.naiveH(patternInput,textInput,hibaInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));
    }else if(selectedAlgorithm===7){
      //Shift Or algoritmus
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(shiftOr(patternInput,textInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));
    }else if(selectedAlgorithm===8){
      //Karp Rabin algoritmus
      const startPre = performance.now();
      let preTable=kr.preKR(patternInput,textInput);
      const endPre = performance.now();
      setTimerPre(endPre-startPre);
      const startTime = performance.now();
      setOutput(kr.KR(patternInput,textInput,preTable));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    }

  };

  React.useEffect(() => {
    if(selectedAlgorithm===0){
      setDescription("Ez a Naive algoritmus");
    } else if(selectedAlgorithm===1){
      setDescription("Ez a Not so naive algoritmus");
    } else if(selectedAlgorithm===2){
      setDescription("Ez a Boyer-Moore algoritmus");
    } else if(selectedAlgorithm===4){
      setDescription("Ez a Knut-Morris-Pratt algoritmus");
    } else if(selectedAlgorithm===6){
      setDescription("Ez a Aho-Corasick algoritmus");
    } else if(selectedAlgorithm===7){
      setDescription("Ez a Shift-or algoritmus");
    } else if(selectedAlgorithm===8){
      setDescription("Ez a Karp and Rabin algoritmus");
    } else if(selectedAlgorithm===9){
      setDescription("Ez a Suffix fa");
    } else if(selectedAlgorithm===10){
      setDescription("Ez a Naiv Hibával");
    }  
  }, [selectedAlgorithm]);


  return (
    <div className="App">
      <div className="algorithm">
        <button className="algorithm-button"
          style={{backgroundColor: (selectedAlgorithm===0) ? "#42b983" : "#555a64"}}
          onClick={() => {
            setSelectedAlgorithm(0);
          }}
          >Naive</button>
          <button className="algorithm-button"
          style={{backgroundColor: (selectedAlgorithm===10) ? "#42b983" : "#555a64"}}
          onClick={() => {
            setSelectedAlgorithm(10);
          }}
          >Naive H</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===1) ? "#42b983" : "#555a64"}}
        onClick={() => {
          setSelectedAlgorithm(1);
          }}>Not So Naiv</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===2) ? "#42b983" : "#555a64"}}  
        onClick={() => {
          setSelectedAlgorithm(2);
          }}>Boyer-Moore</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===4) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(4);
          }}>Knut-Morris-Pratt</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===6) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(6);
          }}>Aho-Corasick</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===7) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(7);
          }}>Shift-Or</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===8) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(8);
          }}>Karp and Rabin</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===9) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(9);
          }}>Suffix fa</button>
      </div>
      <div className="description">
        <div>Leírás: {description}</div>
      </div>
      <div className="inputField">
        <p>Szöveg, amibe keresni szertnél:</p>
        <textarea
          className="input-text"
          placeholder="Szöveg"
          maxLength="500000000"
          value={textInput}
          rows="20"
          onChange={(e) => setTextInput(e.target.value)}
        />
        <p>Minta, amit meg szeretnél találni:</p>
        <textarea
          className="input-pattern"
          placeholder="Minta"
          value={patternInput}
          rows="2"
          onChange={(e) => setPatternInput(e.target.value)}
        />
        {selectedAlgorithm === 10 ? (
          <div>
            <p>Hiba:</p>
            <input
              className="input-hiba"
              type="number"
              min="0"
              placeholder="0 <= Szám"
              value={hibaInput}
              onChange={(e) => setHibaInput(e.target.value)}
            />
          </div>
        ) : null}
      </div>
      <button className="input-button" onClick={handleSearchClick}>Search</button>
      <div>
      <p>Előfeldolgozás ideje: {timerPre} ms</p>
      <p>Keresési ideje: {timerSearch} ms</p>
      <p>Teljes idő: {timerSearch+timerPre} ms</p>
        {output.length > 0 ? (
          output.map((element, index) => (
            <OutputArea 
              key={index} 
              element={element} 
              index={index} />
          )) ) : (
            <h3>Nothing found</h3>
          )}
      </div>
      </div>
  );
}

export default App;
