import { createState, State, SetStateFunction } from "solid-js";

// The type of the application state.
type StoreStateType = {
  count: number;
  values: number[];
}

// Class that creates application state, exposes it for reading, and provides methods for updating the state.
export class Store {
  state: State<StoreStateType>
  private setState: SetStateFunction<StoreStateType>

  constructor() {
    [this.state, this.setState] = createState<StoreStateType>(this.createDefaultState());
  }

  incrementCount() { this.setState("count", c => c + 1) }
  addToCount(v: number) { this.setState("count", v) }
  setCount(v : number) { this.setState("count", v) }
  reset() { this.setState(this.createDefaultState()) }
  addValue(v: number) { this.setState("values", values => [...values, v]) }
  removeLastValue() { this.setState("values", values => [...values.slice(0, values.length - 1)]) }

  private createDefaultState: () => StoreStateType = () => ({ count: 0, values: [] })
}
