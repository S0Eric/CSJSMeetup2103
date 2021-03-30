import { Component, For } from "solid-js"
import { ExpInfoStore } from "./ExpInfoStore";

type ExpInfoPropsType = {
  store: ExpInfoStore;
}

export const ExpInfo: Component<ExpInfoPropsType> = props => {
  // Format the timestamp as HH:MM:SS or __:__:__ if undefined.
  const fmtTs = (idx: number) => {
    const timestamp = props.store.state.timestamps[idx];
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
  const fmtValue = (val: number | undefined) => val !== undefined ? val.toString() : "-";

  return (
    <div class="expinfo_container">
      <div class="expinfo_titlebar">
        <div class="expinfo_timestamp">hh:mm:ss</div>
        <For each={[0, 1, 2, 3, 4, 5, 6, 7]}>
          {idx => <div class="expinfo_timestamp">{fmtTs(idx)}</div>}
        </For>
      </div>
      <div class="expinfo_datatable">
        <For each={props.store.state.settings}>
          {setting => (
            <>
              <div class="expinfo_descr">{setting.descr}</div>
              <For each={[0, 1, 2, 3, 4, 5, 6, 7]}>
                {idx => (
                  <div class="expinfo_value">{fmtValue(setting.values[idx])}</div>
                )}
              </For>
            </>
          )}
        </For>
      </div>
    </div>
  );
}
