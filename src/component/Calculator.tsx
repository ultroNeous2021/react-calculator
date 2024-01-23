import Display from "./Display";
import Buttons from "./Buttons";
import { actionList, buttonList } from "../utils/constant";

const Calculator = () => {
  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <Display />
        <div className="buttons">
          {buttonList?.map((item: string) => {
            return <Buttons key={actionList[item].id} {...actionList[item]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
