import React, { useState, useEffect, useRef } from 'react';
import '../styles/PasswordGenerator.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import generatePassword from '../utils/generatePassword';
import copyToClipboard from '../utils/copyToClipboard';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const passwordText = useRef();
  const [length, setLength] = useState(14);

  // check states
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);

  useEffect(() => {
    generateAndSetPassword(length);
  }, []);

  const generateAndSetPassword = async (length, idx = 20) => {
    if (idx < 0) return;
    const password = generatePassword(length, {
      uppercase,
      lowercase,
      numbers,
      symbols,
    });
    await setTimeout(() => setPassword(password), 10);
    generateAndSetPassword(length, idx - 1);
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
    <form
      id="password-generator-form"
      className={strengthClass}
      onSubmit={onSubmit}
    >
      <h1>Password Generator</h1>
      <div id="password-container">
        <input
          id="password"
          className={strengthClass}
          value={password}
          ref={passwordText}
          disabled
        />
        <FontAwesomeIcon
          id="clipboard-icon"
          icon={faClipboard}
          size="lg"
          title="Copy to Clipboard!"
          onClick={() => copyToClipboard(password)}
        />
      </div>
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

export default PasswordGenerator;
