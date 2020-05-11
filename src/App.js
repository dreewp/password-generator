import React, { useState, useEffect } from 'react';
import './App.scss';
import generatePassword from './utils/generatePassword';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(14);

  // check states
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  useEffect(() => {
    generateAndSetPassword(length);
  }, []);

  const generateAndSetPassword = (length) => {
    const password = generatePassword(length, {
      uppercase,
      lowercase,
      numbers,
      symbols,
    });
    setPassword(password);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    generateAndSetPassword(length);
  };
  const handleLengthChange = (e) => {
    const length = e.target.value;
    setLength(length);
    generateAndSetPassword(length);
  };

  const getStrength = () => {
    if (length <= 8) return 'weak';
    else if (length <= 10) return 'medium';
    else return 'strong';
  };
  const strengthClass = getStrength();

  return (
    <form id="password-generator-form" onSubmit={onSubmit}>
      <h1>Password Generator</h1>
      <input
        id="password"
        className={strengthClass}
        value={password}
        disabled
      />
      <span id="strength">Strength ({strengthClass})</span>
      <br />
      <label>Length ({length})</label>
      <input
        type="range"
        min={1}
        max={40}
        step={1}
        value={length}
        onChange={handleLengthChange}
      />
      <label>
        <input
          type="checkbox"
          checked={uppercase}
          onChange={(e) => setUppercase(e.target.checked)}
        />
        Include uppercase letters
      </label>
      <label>
        <input
          type="checkbox"
          checked={lowercase}
          onChange={(e) => setLowercase(e.target.checked)}
        />
        Include lowercase letters
      </label>
      <label>
        <input
          type="checkbox"
          checked={numbers}
          onChange={(e) => setNumbers(e.target.checked)}
        />
        Include numbers
      </label>
      <label>
        <input
          type="checkbox"
          checked={symbols}
          onChange={(e) => setSymbols(e.target.checked)}
        />
        Include symbols (ex. !@#$)
      </label>
      <br />
      <button id="generate-btn" type="submit">
        Generate
      </button>
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <PasswordGenerator />
    </div>
  );
}

export default App;
