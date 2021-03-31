// import { Component } from "solid-js";
import { render } from "solid-js/web";
// import { ExpInfo } from "./ExpInfo";
// import { ExpInfoStore } from "./ExpInfoStore";
// import { MockDataService } from "./MockDataService";

// // Create the store that manages the application state object.
// let store = new ExpInfoStore();

// // Use the current time as the experiment start time, and set it in the state.
// let startTimestamp = new Date().getTime();
// store.setStartTimestamp(startTimestamp);

const Hey = (props: {name: string}) => <strong>Hello {props.name}!</strong>
// const Hey: Component<{name: string}> = props => <strong>Hello {props.name}!</strong>
// type HeyPropsType = {
//   name: string;
//   color: string;
// }
// const Hey: Component<HeyPropsType> = props => <strong style={{color: props.color}}>Hello {props.name}!</strong>

// When the page loads, render the ExpInfo component.
window.addEventListener("load", () => {
  render (() => <Hey name="CSJS" />, document.getElementById("root") as Node);

  // // Demo the mock data service.
  // MockDataService.getSettingsByTimestamp(new Date().getTime()).then(settings => {
  //   console.log(settings);
  // });
//   render(() => <ExpInfo store={store} />, document.getElementById("root") as Node);

//   // After two seconds, populate the state with timestamps that are 5 minutes apart.
//   // This simulates a user that is changing the part of the experiment they are looking at.
//   setTimeout(() => populateState(5), 2000);
});

// // Set all 8 timestamps in the state, with the specified number of minutes between them.
// const populateState = (timestampGapMinutes: number) => {
//   for (let i = 0; i < 8; i++) {
//     let timestamp = startTimestamp + (i+1) * timestampGapMinutes * 60000;
//     store.setTimestamp(i, timestamp);
//     MockDataService.getSettingsByTimestamp(timestamp).then(settings => {
//       store.setSettings(i, settings);
//     });
//   }
// }
