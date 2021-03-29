import { Component, For } from "solid-js"
import { ExpInfoStore } from "./ExpInfoStore";

type ExpInfoPropsType = {
  store: ExpInfoStore;
}

export const ExpInfo: Component<ExpInfoPropsType> = props => {
  const fmtTs = (ts: number) => ts > 0 ? FormatTime(ts, props.store.state.startTimestamp) : "__:__:__";
  const fmtValue = (val: number | undefined) => val !== undefined ? val.toString() : "-";
  return (
    <div class="expinfo_container">
      <div class="expinfo_titlebar">
        <div class="expinfo_timestamp">hh:mm:ss</div>
        <For each={props.store.state.timestamps}>
          {ts => (
            <div class="expinfo_timestamp">{fmtTs(ts)}</div>
          )}
        </For>
      </div>
      <div class="expinfo_datatable">
        <For each={props.store.state.settings}>
          {setting => (
            <>
              <div class="expinfo_descr">{setting.descr}</div>
              <For each={[0, 1, 2, 3, 4, 5, 6, 7]}>
                {i => (
                  <div class="expinfo_value">{fmtValue(setting.values[i])}</div>
                )}
              </For>
            </>
          )}
        </For>
      </div>
    </div>
  )
}

const FormatTime = (timestamp: number, startTimestamp: number) => {
  // Get number of milliseconds between the timestamp and the start time.
  let time = timestamp > startTimestamp ? timestamp - startTimestamp : 0;
  // Round to nearest second.
  time = Math.round(time / 1000) * 1000;
  // Return formatted string, just hh:mm:ss.
  return new Date(time).toISOString().substring(11, 19);
}
