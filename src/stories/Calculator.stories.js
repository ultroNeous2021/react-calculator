import { FirstKey } from "./Button.stories";
import Calculator from "../component/Calculator";
import { FirstDisplay } from "./Display.stories";

export default {
  title: "Calculator",
  component: Calculator,
};

export const FirstCalculator = () => (
  <>
    <div className="calculator-wrapper">
      <div className="calculator">
        <FirstDisplay />
        <FirstKey />
      </div>
    </div>
  </>
);
