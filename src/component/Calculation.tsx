import { createContext, useCallback, useEffect, useState } from "react";
import { calculationProps, calculationResult } from "../types/types";
import {
  evaluteString,
  getLastElementOfString,
  isArithmeticOperator,
  isNumber,
  isRepeatDot,
  isRepeatZero,
  removeLastElementOfString,
  replaceArithmeticOperator,
  replaceZeroWithCurrentValue,
} from "../utils/eventUtils";

import { actionTypes, keyboardEventList } from "../utils/constant";

export const NumberContext = createContext<calculationResult>({
  result: "",
  getValue: () => {},
  resultPrinted: false,
});

const Calculation = ({ children }: calculationProps) => {
  const [result, setResult] = useState<string>("");
  const [resultPrinted, setResultPrinted] = useState<boolean>(false);

  const getValue = useCallback(
    (key: string) => {
      const value = keyboardEventList[key]?.title;
      const type = keyboardEventList[key]?.type;

      switch (type) {
        case actionTypes.calculation: {
          if (resultPrinted) {
            if (isArithmeticOperator({ symbol: value })) {
              setResultPrinted(false);
            } else {
              return;
            }
          }

          // To get last element of result
          const lastElement = getLastElementOfString({
            result,
            lastSequence: 1,
          });
          if (
            lastElement === "0" &&
            !isArithmeticOperator({ symbol: value }) &&
            value !== "0" &&
            value !== "."
          ) {
            const abc = replaceZeroWithCurrentValue({ result });
            if (abc) {
              setResult(removeLastElementOfString({ result }) + value);
              return;
            }
            console.log({ abc });
          }
          if (value === "0") {
            if (isRepeatZero({ result })) return;
          }
          // enter in this if current action is to add dot
          if (value === ".") {
            // checks here dot is repeated or not if not then enterd inside the if condition
            if (!isRepeatDot({ result })) {
              // add zero before dot if previous value is not a number.
              if (!isNumber({ lastElement })) {
                setResult((preVal: string) => preVal + "0" + value);
                return;
              } else {
                setResult((preVal: string) => preVal + value);
              }
            }
            return;
          }
          // to check last and  second last action is arithmetic operator or not if yes then replace with new one.
          if (
            isArithmeticOperator({ symbol: lastElement }) &&
            isArithmeticOperator({ symbol: value })
          ) {
            setResult((prevResult) =>
              replaceArithmeticOperator({ result: prevResult, value })
            );
            return;
          }

          // check length of string is not greaterthan 15, if more than then return control outside of function without adding them in string
          if (result?.length >= 15) return;

          // add current element into the string for calculation.

          setResult((prevResult) => prevResult + value);
          break;
        }

        case actionTypes.clearAll: {
          // clear all string with empty string
          setResult("");
          setResultPrinted(false);
          break;
        }

        case actionTypes.clear: {
          // remove last element of string from the string.
          setResult((prevResult) =>
            removeLastElementOfString({ result: prevResult })
          );
          break;
        }
        case actionTypes.result: {
          // set final result to display the final evalution of string.
          const eveluate = evaluteString({ result });
          setResult(eveluate);
          Number(eveluate) && setResultPrinted(true);
          break;
        }
        default:
          break;
      }
    },

    [resultPrinted, result]
  );

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // e.preventDefault();
      getValue(e.key);
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [getValue]);

  const shareDataToContext: calculationResult = {
    result,
    getValue,
    resultPrinted,
  };

  return (
    <>
      <NumberContext.Provider value={{ ...shareDataToContext }}>
        {children}
      </NumberContext.Provider>
    </>
  );
};

export default Calculation;
