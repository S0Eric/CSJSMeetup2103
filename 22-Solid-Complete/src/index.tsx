import { start } from "repl";
import { render } from "solid-js/web";
import { ExpInfo } from "./ExpInfo";
import { ExpInfoStore } from "./ExpInfoStore";
import { MockDataService } from "./MockDataService";

let store = new ExpInfoStore();

let startTimestamp = new Date().getTime();
store.setStartTimestamp(startTimestamp);

window.addEventListener("load", () => {
  render(() => <ExpInfo store={store} />, document.getElementById("root") as Node);

  setTimeout(() => populateState(5), 2000);
});

const populateState = (timestampGapMinutes: number) => {
  for (let i = 0; i < 8; i++) {
    let timestamp = startTimestamp + (i+1) * timestampGapMinutes * 60000;
    store.setTimestamp(i, timestamp);
    MockDataService.getSettingsByTimestamp(timestamp).then(settings => {
      store.setSettings(i, settings);
    });
  }

  if (timestampGapMinutes < 60) {
    setTimeout(() => populateState(timestampGapMinutes + 5), 5000);
  }
}
