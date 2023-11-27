
import OutputArea from './OutputArea';
import React, { useState } from 'react';
const naiv = require('./alg/naiv');
const notSoNaive = require('./alg/notSoNaive');
const bm=require('./alg/boyerMoore');
const kmp=require('./alg/kmp');

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(-1);
  const [description, setDescription] = useState("Ez a naive algoritmus");
  const [textInput, setTextInput] = useState('');
  const [patternInput, setPatternInput] = useState('');
  const [hibaInput, setHibaInput] = useState('');
  const [timer, setTimer] = useState(null);
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
      const startTime = performance.now();
      setOutput(naiv.naive(patternInput,textInput));
      const endTime = performance.now();
      setTimer((endTime - startTime));

    }else if(selectedAlgorithm===2){
      let bcTable=bm.bad_character_table(patternInput);
      let gsTable=bm.good_suffix_table(patternInput);
      let fsTable=bm.full_shift_table(patternInput);
      const startTime = performance.now();
      setOutput(bm.boyerMoore(patternInput,textInput,bcTable,gsTable,fsTable));
      const endTime = performance.now();
      setTimer((endTime - startTime));
    }else if(selectedAlgorithm===4){
      let preTable=kmp.kmpPrefix(patternInput)
      const startTime = performance.now();
      setOutput(kmp.kmp(patternInput,textInput,preTable));
      const endTime = performance.now();
      setTimer((endTime - startTime));

    }else if(selectedAlgorithm===1){
      const startTime = performance.now();
      setOutput(notSoNaive(patternInput,textInput));
      const endTime = performance.now();
      setTimer((endTime - startTime));

    }else if(selectedAlgorithm===10){
      if(patternInput === ''){
        alert('Hiba mező nem lehet üres!');
        return 0;
      }
      const startTime = performance.now();
      let out=naiv.naiveH(patternInput,textInput,hibaInput);
      setOutput(out);
      const endTime = performance.now();
      console.log(out);
      setTimer((endTime - startTime));
    } 

  };

  React.useEffect(() => {
    if(selectedAlgorithm===0){
      setDescription("Ez a Naive algoritmus");
    } else if(selectedAlgorithm===1){
      setDescription("Ez a Not so naive algoritmus");
    } else if(selectedAlgorithm===2){
      setDescription("Ez a Boyer-Moore algoritmus");
    } else if(selectedAlgorithm===3){
      setDescription("Ez a Quik Search algoritmus");
    } else if(selectedAlgorithm===4){
      setDescription("Ez a Knut-Morris-Pratt algoritmus");
    } else if(selectedAlgorithm===5){
      setDescription("Ez a Apostolico-Giancarlo algoritmus");
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
        style={{backgroundColor: (selectedAlgorithm===5) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(5);
          }}>Apostolico-Giancarlo</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===6) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(6);
          }}>Aho-Corasick</button>
        <button className="algorithm-button"
        style={{backgroundColor: (selectedAlgorithm===7) ? "#42b983" : "#555a64"}}   
        onClick={() => {
          setSelectedAlgorithm(7);
          }}>Shift-or</button>
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
          <p>{timer}</p>
        </div>
  );
}

export default App;
