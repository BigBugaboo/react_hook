import { useState } from "react";
import { isEqual } from "lodash-es";

const useDeepState = <T = unknown>(initData: T): [T, (nextState: T) => void] => {
  const [state, setState] = useState(initData);

  const setNextState = (nextState: T) => {
    if (isEqual(state, nextState)) return;

    setState(nextState);
  }

  return [state, setNextState];
};

export default useDeepState;
