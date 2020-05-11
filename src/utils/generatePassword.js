const generateUppercase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
const generateLowercase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
const generateNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};
const generateSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
};
const CharGenerator = {
  uppercase: generateUppercase,
  lowercase: generateLowercase,
  numbers: generateNumber,
  symbols: generateSymbol,
};

const generatePassword = (length, conditions) => {
  const conditionsArr = Object.keys(conditions).filter(
    (condition) => conditions[condition] === true
  );

  // while not all conditions are met and length is not full
  const password = [];
  let idx = 0;
  const conditionsLeft = new Set(conditionsArr);
  while (idx < length || conditionsLeft.size > 0) {
    const randomCondition =
      conditionsArr[Math.floor(Math.random() * conditionsArr.length)];
    debugger;
    password[idx % length] = CharGenerator[randomCondition]();

    idx++;
    conditionsLeft.delete(randomCondition);
  }

  return password.join('');
};

export default generatePassword;
