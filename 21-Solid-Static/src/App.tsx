import { Component } from "solid-js";
import { Show, For } from "solid-js/web"
import { Store } from "./store"

// This component is shown instead of the list of values when the list is empty.
const FallBackNoValues: Component = () => <><p /><div style="color: purple">No Values</div></>

type ValuePropsType = { value: number; }

// This component renders a single value from the values list.
const Value: Component<ValuePropsType> = ({ value }) => {
  //console.log(`Rendering Value: ${value}`);
  return <div>{value}</div>;
};

type AppPropsType = { store: Store; }

// This component displays the current state's count value, with a background color that
// depends if it is even or odd. It also displays the state's values list.
export const App: Component<AppPropsType> = ({ store: { state }}) => {
  //console.log("Rendering App");
  const getBgColor = () => (state.count % 2 === 0 ? "orange" : "lightgreen");
  return (
    <>
      <div style={{ "background-color": getBgColor() }}>{state.count}</div>
      <Show when={state.values.length > 0} fallback={<FallBackNoValues />}>
        <ul>
          <For each={state.values}>
            {v => <li><Value value={v} /></li>}
          </For>
        </ul>
      </Show>
    </>
  )
}
