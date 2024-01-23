import { actionList, buttonList } from "../utils/constant";
import Buttons from "../component/Buttons";

export default {
  // title: "Buttons/Button",
  title: "component/Button",
  component: Buttons,
};

export const Number = () => <Buttons className="number" title=" 8 " />;
export const Operator = () => <Buttons className="operator" title="%" />;
export const Danger = () => <Buttons className="danger" title="Red" />;
export const Success = () => <Buttons className="success" title="Yes" />;
export const Alert = () => <Buttons className="alert" title=" warn " />;

export const FirstKey = () => (
  <div className="buttons">
    {buttonList?.map((item) => {
      return (
        <>
          <Buttons {...actionList[item]} />
        </>
      );
    })}
  </div>
);
