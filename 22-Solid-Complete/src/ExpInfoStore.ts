import { batch, createState, SetStateFunction, State } from "solid-js";
import { SettingsDataType } from "./MockDataService";

type SettingRowType = {
  descr: string,
  values: (number | undefined)[]
}

type ExpInfoStateType = {
  startTimestamp: number;
  timestamps: (number | undefined)[];
  settings: SettingRowType[];
}

export class ExpInfoStore {
  state: State<ExpInfoStateType>;
  private setState: SetStateFunction<ExpInfoStateType>;
  private descrToRowIndex: { [descr: string]: number } = {};

  constructor() {
    [this.state, this.setState] = createState<ExpInfoStateType>(
      {
        startTimestamp: 0,
        timestamps: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        settings: []
      }
    );
  }

  // Initially set the experiment start timestamp.
  setStartTimestamp(timestamp: number) {
    this.setState("startTimestamp", timestamp);
  }

  // Set the timestamp for a particular column index.
  setTimestamp(index: number, timestamp: number) {
    // Update the timestamp at the specified index.
    this.setState("timestamps", index, timestamp);
    // Loop through the settings rows, clearing this column's values.
    for (let i = 0; i < this.state.settings.length; i++) {
      this.setState("settings", i, "values", index, undefined);
    }
  }

  // Set the settings values for a particular column index.
  setSettings(index: number, settings: SettingsDataType) {
    // Loop through the settings, setting the value in each row for the specified column index.
    for (let i = 0; i < settings.length; i++) {
      // Deconstruct the properties out of the settings object.
      const {description, value} = settings[i];
      // For this setting description, look up the row it belongs to.
      const rowIdx = this.descrToRowIndex[description];
      // If we've seen this description before and have a row, then set the value in that row/column.
      if (rowIdx !== undefined) {
        this.setState("settings", rowIdx, "values", index, value);
      }
      else {
        // Add a new row for this description we've not seen before.
        this.descrToRowIndex[description] = this.state.settings.length;
        const values: (number | undefined)[] = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
        values[index] = value;
        const newRow: SettingRowType = { descr: description, values: values }
        this.setState("settings", [...this.state.settings, newRow]);
      }
    }
  }
}
