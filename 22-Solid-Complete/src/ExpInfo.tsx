import { Component, For, Show } from "solid-js"
import { ExpInfoStore } from "./ExpInfoStore";

type ExpInfoPropsType = {
  store: ExpInfoStore;
  updownCb?: (isDown: boolean) => void;
}

export const ExpInfo: Component<ExpInfoPropsType> = props => {
  // Format the timestamp as HH:MM:SS or __:__:__ if undefined.
  const fmtTs = (timestamp: number | undefined) => {
    console.log(`Formatting timestamp ${timestamp}`);
    if (timestamp !== undefined) {
      // Get number of milliseconds between the timestamp and the start time.
      let time = timestamp > props.store.state.startTimestamp ? timestamp - props.store.state.startTimestamp : 0;
      // Round to nearest second.
      time = Math.round(time / 1000) * 1000;
      // Return formatted string, just hh:mm:ss.
      return new Date(time).toISOString().substring(11, 19);
    }
    else {
      return "__:__:__";
    }
  }

  // Display the value as a string, or "-" if undefined.
  const fmtValue = (val: number | undefined) => {
    console.log("Formatting a value");
    return val !== undefined ? val.toString() : "-";
  }

  // Handle the up/down button clicks.
  const handleUpDownClick = (isDown: boolean) => {
    if (props.updownCb !== undefined)
      props.updownCb(isDown);
  }

  console.log("Rendering the whole component");
  return (
    <>
      <Show when={props.updownCb !== undefined}>
        <button style="width:100px" onClick={() => handleUpDownClick(true)}>Down</button>
        <button style="width:100px" onClick={() => handleUpDownClick(false)}>Up</button>
      </Show>

      <div class="expinfo_container">
        <div class="expinfo_titlebar">
          <div class="expinfo_timestamp">hh:mm:ss</div>
          <For each={props.store.state.timestamps}>
            {timestamp => <div class="expinfo_timestamp">{fmtTs(timestamp)}</div>}
          </For>
        </div>
        <div class="expinfo_datatable">
          <For each={props.store.state.settings}>
            {setting => (
              <>
                <div class="expinfo_descr">{setting.descr}</div>
                <For each={setting.values}>
                  {value => <div class="expinfo_value">{fmtValue(value)}</div>}
                </For>
              </>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
