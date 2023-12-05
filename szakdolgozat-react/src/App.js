import React, { useState } from 'react';
import OutputArea from './OutputArea';
import OutputAreaAC from './OutputAreaAC';
import HighlightedText from './HighlightedText';
import './style.css'
const naiv = require('./alg/naiv');
const notSoNaive = require('./alg/notSoNaive');
const bm = require('./alg/boyerMoore');
const kmp = require('./alg/kmp');
const shiftOr = require('./alg/shiftOr');
const kr = require('./alg/KarpRabin');
const AhoCorasick = require('./alg/ahoCarasick');

/**
 * Main aplikáció component.
 * @returns {JSX.Element} - React JSX element.
 */
function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(-1);
  const [description, setDescription] = useState("Ez a naive algoritmus");
  const [textInput, setTextInput] = useState('');
  const [patternInput, setPatternInput] = useState('');
  const [patternInput2, setPatternInput2] = useState('');
  const [patternInput3, setPatternInput3] = useState('');
  const [patternInput4, setPatternInput4] = useState('');
  const [patternInput5, setPatternInput5] = useState('');
  const [hibaInput, setHibaInput] = useState('');
  const [timerSearch, setTimerSearch] = useState(0);
  const [timerPre, setTimerPre] = useState(0);
  const [output, setOutput] = useState([]);

   /**
   * Kezeli a keresés gomb kattintási eseményét.
   */
  const handleSearchClick = () => {
    if (textInput === '') {
      alert('Szöveg mező nem lehet üres!');
      return 0;
    }
    if (patternInput === '') {
      alert('Minta mező nem lehet üres!');
      return 0;
    }
    if (selectedAlgorithm === 0) {
      //Naiv algoritmus
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(naiv.naive(patternInput, textInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    } else if (selectedAlgorithm === 2) {
      //Boyer-Moore algoritmus
      const startPre = performance.now();
      let bcTable = bm.bad_character_table(patternInput);
      let gsTable = bm.good_suffix_table(patternInput);
      let fsTable = bm.full_shift_table(patternInput);
      const endPre = performance.now();
      setTimerPre(endPre - startPre);
      const startTime = performance.now();
      setOutput(bm.boyerMoore(patternInput, textInput, bcTable, gsTable, fsTable));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));
    } else if (selectedAlgorithm === 4) {
      //KMP algoritmus
      const startPre = performance.now();
      let preTable = kmp.kmpPrefix(patternInput)
      const endPre = performance.now();
      setTimerPre(endPre - startPre);
      const startTime = performance.now();
      setOutput(kmp.kmp(patternInput, textInput, preTable));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    } else if (selectedAlgorithm === 1) {
      //Not so Naiv algoritmus
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(notSoNaive(patternInput, textInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    } else if (selectedAlgorithm === 10) {
      //Naiv Hamming Distance algoritmus
      if (hibaInput === '') {
        alert('Hiba mező nem lehet üres!');
        return 0;
      }
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(naiv.naiveH(patternInput, textInput, hibaInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));
    } else if (selectedAlgorithm === 7) {
      //Shift Or algoritmus
      setTimerPre(0);
      const startTime = performance.now();
      setOutput(shiftOr(patternInput, textInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));
    } else if (selectedAlgorithm === 8) {
      //Karp Rabin algoritmus
      const startPre = performance.now();
      let preTable = kr.preKR(patternInput, textInput);
      const endPre = performance.now();
      setTimerPre(endPre - startPre);
      const startTime = performance.now();
      setOutput(kr.KR(patternInput, textInput, preTable));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    } else if (selectedAlgorithm === 6) {
      //Aho-Corasick algoritmus
      const startPre = performance.now();
      let acClass = new AhoCorasick();
      acClass.addPattern(patternInput);
      if (patternInput2 !== '') { acClass.addPattern(patternInput2); }
      if (patternInput3 !== '') { acClass.addPattern(patternInput3); }
      if (patternInput4 !== '') { acClass.addPattern(patternInput4); }
      if (patternInput5 !== '') { acClass.addPattern(patternInput5); }
      acClass.buildFailureLinks();
      const endPre = performance.now();
      setTimerPre(endPre - startPre);
      const startTime = performance.now();
      setOutput(acClass.search(textInput));
      const endTime = performance.now();
      setTimerSearch((endTime - startTime));

    }

  };

  /**
  * Ahogy változik a kiválasztott algoritmus úgy változtatja a leírást
  * @useState {selectedAlgorithm} - kiválasztott algoritmus
  */
  React.useEffect(() => {
    if (selectedAlgorithm === 0) {
      setDescription("Ez a Naive algoritmus");
    } else if (selectedAlgorithm === 1) {
      setDescription("Ez a Not so naive algoritmus");
    } else if (selectedAlgorithm === 2) {
      setDescription("Ez a Boyer-Moore algoritmus");
    } else if (selectedAlgorithm === 4) {
      setDescription("Ez a Knut-Morris-Pratt algoritmus");
    } else if (selectedAlgorithm === 6) {
      setDescription("Ez a Aho-Corasick algoritmus");
    } else if (selectedAlgorithm === 7) {
      setDescription("Ez a Shift-or algoritmus");
    } else if (selectedAlgorithm === 8) {
      setDescription("Ez a Karp and Rabin algoritmus");
    } else if (selectedAlgorithm === 10) {
      setDescription("Ez a Naiv Hibával");
    } else {
      setDescription("");
    }
  }, [selectedAlgorithm]);

  /**
   * Reseteli az időket és kimeneti találatokat.
   */
  function reset() {
    setOutput([]);
    setTimerPre(0);
    setTimerSearch(0);
  }

   /**
   * Felosztja a kimenetet, és ennek megfelelően rendereli a kiemelt szöveget.
   * @param {Array} out - A kimeneti elemek tömbje.
   * @returns {JSX.Element} - React JSX element.
   */
  function splitOutput(out) {
    let dic = {};
    for (let i = 0; i < out.length; i++) {
      if (dic[out[i].pattern]) {
        dic[out[i].pattern].push(out[i].index);
      } else {
        dic[out[i].pattern] = [out[i].index];
      }
    }
    return Object.keys(dic).map((key) => (
      <div key={key}>
        <p>{key}:</p>
        <HighlightedText
          key={key}
          T={textInput}
          P={key}
          indices={dic[key]}
        />
      </div>
    ));
  }


  return (
    <div className="App">
      <h1>String matching algoritmusok</h1>
      {selectedAlgorithm === -1 ? <h3>Válasz algoritmust:</h3> : null}
      <div className="algorithm">
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 0) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(0);
          }}
        >Naive</button>
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 10) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(10);
          }}
        >Naive H</button>
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 1) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(1);
          }}>Not So Naiv</button>
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 2) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(2);
          }}>Boyer-Moore</button>
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 4) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(4);
          }}>Knut-Morris-Pratt</button>
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 6) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(6);
          }}>Aho-Corasick</button>
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 7) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(7);
          }}>Shift-Or</button>
        <button className="algorithm-button"
          style={{ backgroundColor: (selectedAlgorithm === 8) ? "#42b983" : "#555a64" }}
          onClick={() => {
            reset();
            setSelectedAlgorithm(8);
          }}>Karp and Rabin</button>
      </div>
      <div className="description">
        <div>Leírás: {description}</div>
      </div>
      <div className="inputField">
        <p>Szöveg, amibe keresni szertnél:</p>
        <div className="parent-container">
          <textarea
            className="input-text"
            placeholder="Szöveg"
            value={textInput}
            rows="20"
            onChange={(e) => setTextInput(e.target.value)}
          />
          <div className="input-length">{textInput.length}</div>
        </div>
        <p>Minta, amit meg szeretnél találni:</p>
        <div className="parent-container">
          <textarea
            className="input-pattern"
            placeholder="Minta"
            value={patternInput}
            rows="2"
            onChange={(e) => setPatternInput(e.target.value)}
          />
          <div className="input-length">{patternInput.length}</div>
        </div>
        {selectedAlgorithm === 6 ? (
          <div>
            <p>Minta 2:</p>
            <div className="parent-container">
              <textarea
                className="input-pattern"
                placeholder="Minta 2"
                value={patternInput2}
                onChange={(e) => setPatternInput2(e.target.value)}
              />
              <div className="input-length">{patternInput2.length}</div>
            </div>
            <p>Minta 3:</p>
            <div className="parent-container">
              <textarea
                className="input-pattern"
                placeholder="Minta 3"
                value={patternInput3}
                onChange={(e) => setPatternInput3(e.target.value)}
              />
              <div className="input-length">{patternInput3.length}</div>
            </div>
            <p>Minta 4:</p>
            <div className="parent-container">
              <textarea
                className="input-pattern"
                placeholder="Minta 4"
                value={patternInput4}
                onChange={(e) => setPatternInput4(e.target.value)}
              />
              <div className="input-length">{patternInput4.length}</div>
            </div>
            <p>Minta 5:</p>
            <div className="parent-container">
              <textarea
                className="input-pattern"
                placeholder="Minta 5"
                value={patternInput5}
                onChange={(e) => setPatternInput5(e.target.value)}
              />
              <div className="input-length">{patternInput5.length}</div>
            </div>
          </div>
        ) : null}
        {selectedAlgorithm === 10 ? (
          <div>
            <p>Hamming Távolság:</p>
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
      <button className="input-button" onClick={handleSearchClick}>Keresés</button>
      <hr></hr>
      <div>

        <h3>Előfeldolgozás ideje: {timerPre} ms</h3>
        <h3>Keresési ideje: {timerSearch} ms</h3>
        <h3>Teljes idő: {timerSearch + timerPre} ms</h3>
        <hr></hr>
        {(output.length > 0 && selectedAlgorithm !== 6) ? (
          output.map((element, index) => (
            <OutputArea
              key={index}
              element={element}
              index={index}
              long={textInput.length} />
          ))) : (selectedAlgorithm === 6 && output.length > 0) ? (
            output.map((item, index) => (
              <OutputAreaAC
                key={index}
                pattern={item.pattern}
                index={item.index}
                long={textInput.length} />
            ))) : (
          <h3>Nem talált semmit</h3>
        )}
      </div>
      <hr className='hr-egy' />
      <h2>A szövegben:</h2>
      {(output.length > 0 && selectedAlgorithm === 6 ? splitOutput(output) : null)}
      {(output.length > 0 && selectedAlgorithm !== 6) ? <HighlightedText T={textInput} P={patternInput} indices={output} /> : null}
    </div>
  );
}

export default App;
