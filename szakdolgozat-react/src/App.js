
import OutputArea from './OutputArea';
import React, { useState } from 'react';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("naive");
  const [description, setDescription] = useState("Ez a naive algoritmus");
  const [textInput, setTextInput] = useState('');
  const [patternInput, setPatternInput] = useState('');
  const handleSearchClick = () => {
    console.log('Text input:', textInput);
    console.log('Pattern input:', patternInput);
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
          onClick={() => {
            setSelectedAlgorithm(0);
          }}
          >Naive</button>
        <button className="algorithm-button" 
        onClick={() => {
          setSelectedAlgorithm(1);
          }}>Not So Naiv</button>
        <button className="algorithm-button"  
        onClick={() => {
          setSelectedAlgorithm(2);
          }}>Boyer-Moore</button>
        <button className="algorithm-button"  
        onClick={() => {
          setSelectedAlgorithm(3);
          }}>Quik Search</button>
        <button className="algorithm-button"   
        onClick={() => {
          setSelectedAlgorithm(4);
          }}>Knut-Morris-Pratt</button>
        <button className="algorithm-button"   
        onClick={() => {
          setSelectedAlgorithm(5);
          }}>Apostolico-Giancarlo</button>
        <button className="algorithm-button"   
        onClick={() => {
          setSelectedAlgorithm(6);
          }}>Aho-Corasick</button>
        <button className="algorithm-button"   
        onClick={() => {
          setSelectedAlgorithm(7);
          }}>Shift-or</button>
        <button className="algorithm-button"   
        onClick={() => {
          setSelectedAlgorithm(8);
          }}>Karp and Rabin</button>
        <button className="algorithm-button"   
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
      <OutputArea />
    </div>
  );
}

export default App;
