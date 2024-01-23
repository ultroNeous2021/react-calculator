import {
  displayResultTypes,
  evaluateStringTypes,
  getLastElementOfStringTypes,
  isArithmeticOperatorType,
  isNumberTypes,
  isRepeatZeroTypes,
  isRepeatDotTypes,
  removeLastElementTypes,
  replaceArithmeticOperatorType,
  splitLastElementType,
  splitStrInArrType,
  replaceZeroWithCurrentValueTypes,
  getSplitedStringBasedOnDotInLastOperandsTypes,
} from "../types/types";

export const isArithmeticOperator = ({
  symbol,
}: isArithmeticOperatorType): boolean => {
  const arithmeticOperators = ["+", "-", "*", "/", "%"];
  return arithmeticOperators.includes(symbol);
};

export const removeLastElementOfString = ({
  result,
}: removeLastElementTypes): string => {
  return result.slice(0, result.length - 1);
};

export const removeFirstElementOfArray = ({
  removeFirstElement,
}: {
  removeFirstElement: string[];
}): string[] => {
  return removeFirstElement.slice(1, removeFirstElement.length);
};

export const replaceArithmeticOperator = ({
  result,
  value,
}: replaceArithmeticOperatorType): string => {
  result = removeLastElementOfString({ result });
  result = result + value;
  return result;
};

export const getLastElementOfString = ({
  result,
  lastSequence,
}: getLastElementOfStringTypes): string =>
  result?.charAt(result.length - lastSequence);

const displayResult = ({ result }: displayResultTypes): string => {
  // return result of display.
  try {
    /* eslint-disable no-new-func */
    const fResult = new Function(`return ${result}`)();
    return Math.floor(fResult) === fResult
      ? String(fResult)
      : String(fResult.toFixed(2)) || "";
  } catch (err) {
    return "";
  }
};

export const isNumber = ({ lastElement }: isNumberTypes): boolean =>
  !isNaN(parseInt(lastElement));

// split string based on arithmetic operators
const splitStrInArr = ({ result }: splitStrInArrType): string[] => {
  // regex to split string based arithmetic operators
  const regexToSplitString = /(?=[-+*%/])/;

  return result.split(regexToSplitString);
};

// split last element based on dot
const splitLastElement = ({ lastElement }: splitLastElementType): string[] => {
  return lastElement.split(".");
};

const getStringBeforeDotInLastOperand = ({
  getLastElement,
}: {
  getLastElement: string[];
}): string[] => {
  let arrayBeforeDot = getLastElement[getLastElement.length - 1].split("");

  if (
    isArithmeticOperator({ symbol: arrayBeforeDot[0] }) &&
    arrayBeforeDot.length > 1
  ) {
    arrayBeforeDot = removeFirstElementOfArray({
      removeFirstElement: arrayBeforeDot,
    });
  }

  return arrayBeforeDot;
};

const getSplitedStringBasedOnDotInLastOperands = ({
  result,
}: getSplitedStringBasedOnDotInLastOperandsTypes): string[] => {
  const getSplitedOperands = splitStrInArr({ result });
  const lastElement = getSplitedOperands[getSplitedOperands.length - 1];
  return splitLastElement({ lastElement });
};

export const replaceZeroWithCurrentValue = ({
  result,
}: replaceZeroWithCurrentValueTypes): boolean => {
  const getLastElement = getSplitedStringBasedOnDotInLastOperands({
    result,
  });

  if (getLastElement.length > 1) return false;

  let arrayBeforeDot = getStringBeforeDotInLastOperand({ getLastElement });

  console.log({ arrayBeforeDot });

  if (arrayBeforeDot.join().length > 1) return false;
  else {
    if (arrayBeforeDot.join().charAt(0) === "0") {
      return true;
    }
  }
  return false;
};

// check repeated zero before dot
export const isRepeatZero = ({ result }: isRepeatZeroTypes): boolean => {
  // if there isn't any value inside result string then return false
  if (!result) return false;

  const getLastElement = getSplitedStringBasedOnDotInLastOperands({ result });

  if (getLastElement.length > 1) return false;

  let arrayBeforeDot = getStringBeforeDotInLastOperand({ getLastElement });

  if (arrayBeforeDot.length === 0) return false;

  return arrayBeforeDot.every((curruntElement) => curruntElement === "0");
};

export const isRepeatDot = ({ result }: isRepeatDotTypes): boolean => {
  const getSplitedOperands = splitStrInArr({ result });

  if (getSplitedOperands.length > 0) {
    const getLastOperand = getSplitedOperands[getSplitedOperands.length - 1];
    return getLastOperand.includes(".");
  }
  return false;
};

export const evaluteString = ({ result }: evaluateStringTypes): string => {
  // check if there is no value then return back control without any calculation.
  if (!result) return result;

  // check if last element of string is arithmetic operator then remove that operator and evalute that string for display result.
  if (
    isArithmeticOperator({
      symbol: getLastElementOfString({ result, lastSequence: 1 }),
    })
  ) {
    result = removeLastElementOfString({ result });
    return displayResult({ result });
  }
  // evalute string if there is no any issue to evalute string.
  return displayResult({ result });
};
    