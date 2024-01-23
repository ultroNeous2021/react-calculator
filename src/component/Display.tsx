import { useContext } from "react";
import { NumberContext } from "./Calculation";
import { calculationResult } from "../types/types";

const Display = () => {
  const { result }: calculationResult = useContext(NumberContext);
  return (
    <>
      <input type="text" value={`${result}`} readOnly />
    </>
  );
};

export default Display;
