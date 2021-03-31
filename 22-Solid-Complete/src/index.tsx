import { render } from "solid-js/web";
import { ExpInfo } from "./ExpInfo";
import { ExpInfoStore } from "./ExpInfoStore";
import { MockDataService } from "./MockDataService";

// Create the store that manages the application state object.
let store = new ExpInfoStore();

// Use the current time as the experiment start time, and set it in the state.
let startTimestamp = new Date().getTime();
store.setStartTimestamp(startTimestamp);

let currentGapMinutes = 15;

const adjustTimestampGap = (isDown: boolean) => {
  if (isDown) {
    if (currentGapMinutes > 5) {
        currentGapMinutes -= 5;
        populateState(currentGapMinutes)
      }
    }
  else {
    if (currentGapMinutes < 60) {
      currentGapMinutes += 5;
      populateState(currentGapMinutes)
    }
  }
}

// When the page loads, render the ExpInfo component.
window.addEventListener("load", () => {
  render (() => <ExpInfo store={store} updownCb={adjustTimestampGap} />, document.getElementById("root") as Node);

  // After two seconds, populate the state with timestamps that are 5 minutes apart.
  // This simulates a user that is changing the part of the experiment they are looking at.
  setTimeout(() => populateState(currentGapMinutes), 2000);
});

// Set all 8 timestamps in the state, with the specified number of minutes between them.
const populateState = (timestampGapMinutes: number) => {
  for (let i = 0; i < 8; i++) {
    let timestamp = startTimestamp + (i+1) * timestampGapMinutes * 60000;
    store.setTimestamp(i, timestamp);
    MockDataService.getSettingsByTimestamp(timestamp).then(settings => {
      store.setSettings(i, settings);
    });
  }
}
