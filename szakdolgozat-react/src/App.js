
import OutputArea from './OutputArea';
import React, { useState } from 'react';
const naiv = require('./alg/naiv');

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(-1);
  const [description, setDescription] = useState("Ez a naive algoritmus");
  const [textInput, setTextInput] = useState('');
  const [patternInput, setPatternInput] = useState('');
  const [timer, setTimer] = useState(null);
  const [output, setOutput] = useState([]);

  const handleSearchClick = () => {
    console.log('Text input:', textInput);
    console.log('Pattern input:', patternInput);
    if(selectedAlgorithm===0){
      const startTime = performance.now();
      setOutput(naiv.naive(patternInput,textInput));
      const endTime = performance.now();
      console.log(startTime,endTime)
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
        style={{backgroundColor: (selectedAlgorithm===3) ? "#42b983" : "#555a64"}} 
        onClick={() => {
          setSelectedAlgorithm(3);
          }}>Quik Search</button>
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
        <p>Text input:</p>
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <p>Pattern input:</p>
        <input
          type="text"
          value={patternInput}
          onChange={(e) => setPatternInput(e.target.value)}
        />
        <button className="input-button" onClick={handleSearchClick}>Search</button>
      </div>
      <div>
        {output.map((element,index)=>(
          <OutputArea 
            element={element}
            index={index}
          />
        ))}
      </div>
      <p>{timer}</p>
    </div>
  );
}

export default App;
