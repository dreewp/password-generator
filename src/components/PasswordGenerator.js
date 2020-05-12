import React, { useState, useEffect, useRef, useReducer } from 'react';
import '../styles/PasswordGenerator.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import generatePassword from '../utils/generatePassword';
import copyToClipboard from '../utils/copyToClipboard';

const initialCheckState = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};
const checkStateReducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.checked,
  };
};

const DEFAULT_LENGTH = 14;

const PasswordGenerator = () => {
  const [length, setLength] = useState(DEFAULT_LENGTH);
  const [password, setPassword] = useState(
    generatePassword(DEFAULT_LENGTH, initialCheckState)
  );
  const [checkStates, dispatchCheckStates] = useReducer(
    checkStateReducer,
    initialCheckState
  );
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    dispatchCheckStates({ name, checked });
  };

  // when copying password to clipboard
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    copyToClipboard(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  const generateAndSetPassword = async (length, idx = 20) => {
    if (idx < 0) return;
    const password = generatePassword(length, checkStates);
    await setTimeout(() => setPassword(password), 10);
    generateAndSetPassword(length, idx - 1);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    generateAndSetPassword(length);
  };
  const onLengthChange = (e) => {
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
          disabled
        />
        {copied ? (
          <FontAwesomeIcon id="check-icon" icon={faCheck} size="lg" />
        ) : (
          <FontAwesomeIcon
            id="clipboard-icon"
            icon={faClipboard}
            size="lg"
            title="Copy to Clipboard!"
            onClick={onCopy}
          />
        )}
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
        onChange={onLengthChange}
      />
      <label>
        <input
          type="checkbox"
          name="uppercase"
          checked={checkStates.uppercase}
          onChange={handleCheck}
        />
        Include uppercase letters
      </label>
      <label>
        <input
          type="checkbox"
          name="lowercase"
          checked={checkStates.lowercase}
          onChange={handleCheck}
        />
        Include lowercase letters
      </label>
      <label>
        <input
          type="checkbox"
          name="numbers"
          checked={checkStates.numbers}
          onChange={handleCheck}
        />
        Include numbers
      </label>
      <label>
        <input
          type="checkbox"
          name="symbols"
          checked={checkStates.symbols}
          onChange={handleCheck}
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
