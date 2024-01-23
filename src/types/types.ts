import { ReactNode } from "react";

export interface resultType {
  result: string;
}

export interface lastElementType {
  lastElement: string;
}
export interface calculationProps {
  children: ReactNode;
}

export interface isArithmeticOperatorType {
  symbol: string;
}

export interface replaceArithmeticOperatorType extends resultType {
  value: string;
}

export interface calculationResult extends resultType {
  getValue: (a1: string) => void;
  resultPrinted: boolean;
}

export interface buttonMenu {
  [key: string]: string;
}

export interface actionListType {
  [key: string | number]: buttonMenu;
}

export interface KeyboardEventListType extends actionListType {}

export interface actionMenu extends resultType {
  [key: string]: string;
}

export interface buttonsProps extends buttonMenu {}

export interface getLastElementOfStringTypes extends resultType {
  lastSequence: number;
}

export interface replaceZeroWithCurrentValueTypes extends resultType {}

export interface isNumberTypes extends lastElementType {}

export interface splitLastElementType extends lastElementType {}

export interface evaluateStringTypes extends resultType {}

export interface getSplitedStringBasedOnDotInLastOperandsTypes
  extends resultType {}

export interface isRepeatDotTypes extends resultType {}

export interface splitStrInArrType extends resultType {}

export interface isRepeatZeroTypes extends resultType {}

export interface removeLastElementTypes extends resultType {}

export interface displayResultTypes extends resultType {}
