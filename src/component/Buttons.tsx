import { FC, memo, useContext } from "react";
import { buttonsProps, calculationResult } from "../types/types";
import { NumberContext } from "./Calculation";

const Buttons: FC<buttonsProps> = ({ title, ...rest }) => {
  const { getValue }: calculationResult = useContext(NumberContext);

  return (
    <>
      <button {...rest} onClick={() => getValue(title)}>
        {title}
      </button>
    </>
  );
};

export default memo(Buttons);
