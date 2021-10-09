import React, { useState, FC, useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useDeepState } from "../data";

const Example: FC<unknown> = () => {
  const [deepState, setDeepState] = useDeepState({ count: 0 })
  const [state, setState] = useState({ count: 0 })
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  return (
    <div>
      The useDeepState can diff data before setState, that can reduce re-render count.
      <div>renderCount: {renderCount.current}</div>
      <div>count of deepState: {deepState.count}</div>
      <div>count of state: {state.count}</div>
      <button onClick={() => setDeepState({ ...state, count: deepState.count + 1 })}>add of deepState</button>
      <button onClick={() => setDeepState({ ...state, count: deepState.count })}>set equal value of eepState</button>
      <button onClick={() => setState({ ...state, count: state.count + 1 })}>add of state</button>
      <button onClick={() => setState({ ...state, count: state.count })}>set equal value of state</button>
    </div>
  );
};

export default {
  title: "Example/Data",
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story/>
      </div>
    ),
  ],
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = (args) => (
  <Example {...args} />
);

export const UseDeepState = Template.bind({});
UseDeepState.args = {};
